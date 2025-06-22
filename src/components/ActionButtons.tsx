import React from 'react';
import { MessageSquare, Wrench, Zap, Loader2 } from 'lucide-react';
import type { Operation } from '../types';

interface ActionButtonsProps {
  onAnalyze: (operation: Operation) => void;
  loading: boolean;
  disabled: boolean;
}

const OPERATIONS = [
  {
    key: 'explain' as Operation,
    label: 'Explain Code',
    icon: MessageSquare,
    description: 'Get a detailed explanation of how your code works',
    color: 'blue'
  },
  {
    key: 'fix' as Operation,
    label: 'Fix Code',
    icon: Wrench,
    description: 'Identify and fix bugs or issues in your code',
    color: 'red'
  },
  {
    key: 'optimize' as Operation,
    label: 'Optimize Code',
    icon: Zap,
    description: 'Improve performance and efficiency of your code',
    color: 'green'
  }
];

const ActionButtons: React.FC<ActionButtonsProps> = ({ onAnalyze, loading, disabled }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {OPERATIONS.map(({ key, label, icon: Icon, description, color }) => (
        <button
          key={key}
          onClick={() => onAnalyze(key)}
          disabled={disabled || loading}
          className={`
            flex items-center space-x-3 px-6 py-3 rounded-lg border transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${color === 'blue' && 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:border-blue-300'}
            ${color === 'red' && 'border-red-200 bg-red-50 hover:bg-red-100 text-red-700 hover:border-red-300'}
            ${color === 'green' && 'border-green-200 bg-green-50 hover:bg-green-100 text-green-700 hover:border-green-300'}
            ${!disabled && !loading && 'transform hover:scale-105 shadow-sm hover:shadow-md'}
          `}
          title={description}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Icon className="w-5 h-5" />
          )}
          <div className="text-left">
            <div className="font-semibold">{label}</div>
            <div className="text-xs opacity-75">{description}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;