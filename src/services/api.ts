import axios from 'axios';
import type { Operation } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface AnalyzeCodeResponse {
  aiResponse: string;
  timestamp: string;
}

export const analyzeCode = async (code: string, operation: Operation): Promise<AnalyzeCodeResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze`, {
      code,
      operation
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;
      throw new Error(`Analysis failed: ${message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};