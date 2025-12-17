import React from 'react';
import { Preset } from '../types';
import { PRESETS } from '../constants';

interface PresetGridProps {
  onSelectPreset: (preset: Preset) => void;
  disabled: boolean;
}

const PresetGrid: React.FC<PresetGridProps> = ({ onSelectPreset, disabled }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mx-auto px-4">
      {PRESETS.map((preset) => (
        <button
          key={preset.id}
          onClick={() => onSelectPreset(preset)}
          disabled={disabled}
          className={`
            relative overflow-hidden group p-6 rounded-xl text-left transition-all duration-300
            border border-slate-700/50
            ${disabled 
              ? 'opacity-50 cursor-not-allowed bg-slate-800' 
              : 'hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 bg-slate-800 hover:-translate-y-1'
            }
          `}
        >
          {/* Background Gradient Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/10 transition-all duration-500" />
          
          <div className="flex items-start justify-between relative z-10">
            <div className="flex-1">
              <span className="inline-block p-2 rounded-lg bg-slate-700/50 text-indigo-400 mb-3 group-hover:text-indigo-300 group-hover:bg-indigo-500/20 transition-colors">
                {preset.icon}
              </span>
              <h3 className="text-lg font-medium text-white group-hover:text-indigo-200 transition-colors">
                {preset.label}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto">
                {preset.category.toUpperCase()}
              </p>
            </div>
            
            <div className="mt-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default PresetGrid;