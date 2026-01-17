import axios from 'axios';
import CodeAnalysis from '../models/CodeAnalysis.js';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const analyzeCode = async (req, res) => {
  const startTime = Date.now();

  try {
    const { code, operation } = req.body;

    // Validation
    if (!code || !operation) {
      return res.status(400).json({
        error: 'Missing required fields: code and operation'
      });
    }

    if (!['explain', 'fix', 'optimize'].includes(operation)) {
      return res.status(400).json({
        error: 'Invalid operation. Must be one of: explain, fix, optimize'
      });
    }

    if (code.length > 50000) {
      return res.status(400).json({
        error: 'Code is too long. Maximum 50,000 characters allowed.'
      });
    }

    // Prepare prompt based on operation
    const prompts = {
      explain: `Please provide a clear, detailed explanation of how this code works. Break down the logic, explain what each part does, and highlight any important concepts or patterns used:\n\n${code}`,
      fix: `Please analyze this code for bugs, errors, or issues and provide a corrected version with explanations of what was wrong and how you fixed it:\n\n${code}`,
      optimize: `Please analyze this code for performance improvements and optimization opportunities. Provide an optimized version with explanations of the improvements made:\n\n${code}`
    };

    // Call Groq API
    const groqResponse = await axios.post(GROQ_API_URL, {
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful programming assistant that provides clear, accurate, and practical code analysis. Always format your responses in a readable way with proper explanations.'
        },
        {
          role: 'user',
          content: prompts[operation]
        }
      ],
      max_tokens: 2000,
      temperature: 0.3
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    const aiResponse = groqResponse.data.choices[0]?.message?.content || 'No response generated';
    const responseTime = Date.now() - startTime;

    // Save to database
    const analysisRecord = new CodeAnalysis({
      code,
      operation,
      aiResponse,
      timestamp: new Date(),
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      responseTime,
      success: true
    });

    await analysisRecord.save();

    // Send response
    res.json({
      aiResponse,
      timestamp: new Date().toISOString(),
      responseTime
    });

  } catch (error) {
    const responseTime = Date.now() - startTime;

    // Log error to database
    try {
      const errorRecord = new CodeAnalysis({
        code: req.body.code || '',
        operation: req.body.operation || 'unknown',
        aiResponse: '',
        timestamp: new Date(),
        ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
        userAgent: req.get('User-Agent') || 'unknown',
        responseTime,
        success: false,
        errorMessage: error.message
      });

      await errorRecord.save();
    } catch (dbError) {
      console.error('Failed to log error to database:', dbError);
    }

    console.error('Analysis error:', error.message);
    if (error.response) {
      console.error('API Error Data:', JSON.stringify(error.response.data, null, 2));
    }

    // Handle different types of errors
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return res.status(408).json({
        error: 'Request timed out. Please try again with shorter code or check your connection.'
      });
    }

    if (error.response?.status === 401) {
      return res.status(500).json({
        error: 'AI service authentication failed. Please contact support.'
      });
    }

    if (error.response?.status === 429) {
      return res.status(429).json({
        error: 'AI service rate limit exceeded. Please try again in a few minutes.'
      });
    }

    if (error.response?.status >= 400 && error.response?.status < 500) {
      return res.status(400).json({
        error: 'Invalid request to AI service. Please check your code and try again.'
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'An error occurred while analyzing your code. Please try again later.'
    });
  }
};