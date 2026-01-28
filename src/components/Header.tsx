import React from 'react';
import { Code, Moon, Sun, Github, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, onToggleTheme }) => {
  const navigate = useNavigate();
  return (
    <header className={`h-16 border-b transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-600' : 'bg-emerald-500'
            }`}>
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>CodeFixer IDE</h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
              AI-Powered Code Analysis & Debugging
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className={`p-2 rounded-lg transition-colors ${isDark
              ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            title="Back to Home"
          >
            <Home className="w-5 h-5" />
          </button>
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-colors ${isDark
              ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <a
            href="https://github.com/omar-h-Hashmi-rgb/web_debugger_ide"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg transition-colors ${isDark
              ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            title="View on GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;