export type Operation = 'explain' | 'fix' | 'optimize';

export interface AnalysisResult {
  operation: Operation;
  response: string;
  timestamp: string;
}

export interface CodeAnalysisRequest {
  code: string;
  operation: Operation;
}

export interface CodeAnalysisResponse {
  aiResponse: string;
  timestamp: string;
}