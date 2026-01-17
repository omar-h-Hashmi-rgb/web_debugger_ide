
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

async function testEndpoints() {
    console.log('Testing Endpoints with Model: llama-3.3-70b-versatile');

    // 1. Health Check
    try {
        const health = await axios.get(`${BASE_URL}/health`);
        console.log('✅ /health:', health.data);
    } catch (err) {
        console.error('❌ /health failed:', err.message);
    }

    // 2. Analyze
    try {
        const start = Date.now();
        const analyze = await axios.post(`${BASE_URL}/api/analyze`, {
            code: "console.log('Hello World')",
            operation: "explain"
        });
        const duration = Date.now() - start;
        console.log('✅ /api/analyze:', {
            status: analyze.status,
            responseTime: duration + 'ms',
            aiResponseLength: analyze.data.aiResponse?.length
        });
        // Check if response seems legit
        if (analyze.data.aiResponse && analyze.data.aiResponse.length > 50) {
            console.log('   Response content looks valid.');
        } else {
            console.warn('   ⚠️ Response content very short or empty.');
        }
    } catch (err) {
        console.error('❌ /api/analyze failed:', err.message);
        if (err.response) {
            console.error('   Data:', JSON.stringify(err.response.data));
        }
    }
}

testEndpoints();
