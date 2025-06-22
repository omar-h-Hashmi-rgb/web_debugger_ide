import React from 'react';
import { Copy, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import type { AnalysisResult } from '../types';

interface ResultsPanelProps {
  result: AnalysisResult | null;
  loading: boolean;
  error: string | null;
  isDark: boolean;
  onClearError: () => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  result,
  loading,
  error,
  isDark,
  onClearError
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!result?.response) return;
    
    try {
      await navigator.clipboard.writeText(result.response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const getOperationColor = (operation: string) => {
    switch (operation) {
      case 'explain': return 'text-blue-600';
      case 'fix': return 'text-red-600';
      case 'optimize': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getOperationLabel = (operation: string) => {
    switch (operation) {
      case 'explain': return 'Code Explanation';
      case 'fix': return 'Code Fix';
      case 'optimize': return 'Code Optimization';
      default: return 'Analysis Result';
    }
  };

  return (
    <div className={`h-full flex flex-col ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Header */}
      <div className={`px-4 py-3 border-b transition-colors ${
        isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
      }`}>
        <h2 className="font-semibold text-lg">Analysis Results</h2>
        <p className={`text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          AI-powered code analysis and suggestions
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {loading && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
              <p className={`text-lg font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Analyzing your code...
              </p>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                This may take a few seconds
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4">
            <div className={`p-4 rounded-lg border ${
              isDark 
                ? 'bg-red-900/20 border-red-800 text-red-200' 
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              <div className="flex items-start space-x-3">
                <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Error</h3>
                  <p className="text-sm">{error}</p>
                  <button
                    onClick={onClearError}
                    className={`mt-2 text-sm underline hover:no-underline ${
                      isDark ? 'text-red-300' : 'text-red-600'
                    }`}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {result && !loading && !error && (
          <div className="h-full flex flex-col">
            {/* Result Header */}
            <div className={`px-4 py-3 border-b transition-colors ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-semibold ${getOperationColor(result.operation)}`}>
                    {getOperationLabel(result.operation)}
                  </h3>
                  <p className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {new Date(result.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${
                    copied 
                      ? (isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700')
                      : (isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600')
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Result Content */}
            <div className="flex-1 overflow-auto p-4">
              <pre className={`whitespace-pre-wrap text-sm leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {result.response}
              </pre>
            </div>
          </div>
        )}

        {!result && !loading && !error && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <AlertCircle className={`w-12 h-12 mx-auto mb-4 ${
                isDark ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-lg font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Ready to analyze your code
              </h3>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Paste your code in the editor and click one of the analysis buttons to get started.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;