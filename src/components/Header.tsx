import React from 'react';
import { ShieldCheck, Sparkles, Lock, Cpu, RotateCcw } from 'lucide-react';

interface HeaderProps {
  hasGeminiKey: boolean;
  privacyMode: boolean;
  onTogglePrivacy: () => void;
  onReset: () => void;
  onLoadSample: () => void;
  isAnalyzing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  hasGeminiKey,
  privacyMode,
  onTogglePrivacy,
  onReset,
  onLoadSample,
  isAnalyzing,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                AI Resume Analyzer & Job Matching
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                NLP + Embeddings
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Semantic skill extraction, ATS scoring & responsible AI fairness audit
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5 w-full md:w-auto justify-between md:justify-end">
          {/* Privacy toggle badge */}
          <button
            type="button"
            onClick={onTogglePrivacy}
            title="When active, personal identifiable details (PII) are masked during analysis for bias-free evaluation"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              privacyMode
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Fairness / PII Masking: {privacyMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* AI Status pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Engine:</span>
            <span className="font-semibold text-slate-800">
              {hasGeminiKey ? 'Gemini 3.8 Flash' : 'Hybrid AI'}
            </span>
          </div>

          {/* Quick preset loader */}
          <button
            type="button"
            onClick={onLoadSample}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Demo Data</span>
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={onReset}
            disabled={isAnalyzing}
            title="Reset inputs and clear analysis"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
