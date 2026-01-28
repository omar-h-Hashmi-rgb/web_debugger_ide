import { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import ResultsPanel from '../components/ResultsPanel';
import Header from '../components/Header';
import ActionButtons from '../components/ActionButtons';
import { useTheme } from '../hooks/useTheme';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { analyzeCode } from '../services/api';
import type { AnalysisResult, Operation } from '../types';

function IDE() {
    const { isDark, toggleTheme } = useTheme();
    const [code, setCode] = useLocalStorage('codefixer-code', '// Paste your code here\nconsole.log("Hello, CodeFixer!");');
    const [language, setLanguage] = useLocalStorage('codefixer-language', 'javascript');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async (operation: Operation) => {
        if (!code.trim()) {
            setError('Please enter some code to analyze');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await analyzeCode(code, operation);
            setResult({
                operation,
                response: response.aiResponse,
                timestamp: new Date().toISOString()
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while analyzing the code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-950' : 'bg-gray-50 text-gray-900'
            }`}>
            <Header isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="h-[calc(100vh-4rem)] flex flex-col">
                {/* Action Buttons */}
                <div className={`border-b transition-colors ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                    }`}>
                    <div className="max-w-7xl mx-auto px-4 py-3">
                        <ActionButtons
                            onAnalyze={handleAnalyze}
                            loading={loading}
                            disabled={!code.trim()}
                            isDark={isDark}
                        />
                    </div>
                </div>

                {/* Editor and Results */}
                <div className="flex-1 flex">
                    <div className="flex-1 min-w-0">
                        <CodeEditor
                            code={code}
                            language={language}
                            onChange={setCode}
                            onLanguageChange={setLanguage}
                            isDark={isDark}
                        />
                    </div>

                    <div className={`w-1/2 border-l transition-colors ${isDark ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                        <ResultsPanel
                            result={result}
                            loading={loading}
                            error={error}
                            isDark={isDark}
                            onClearError={() => setError(null)}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default IDE;
