import React from 'react';
import { Sparkles, FileText, Briefcase, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { PRESET_RESUMES, PRESET_JOBS } from '../data/presets';

interface QuickStartBannerProps {
  hasResume: boolean;
  resumeSummaryName: string;
  hasJob: boolean;
  jobSummaryName: string;
  hasResult: boolean;
  onSelectScenario: (resumeIndex: number, jobIndex: number) => void;
  isAnalyzing: boolean;
}

export const QuickStartBanner: React.FC<QuickStartBannerProps> = ({
  hasResume,
  resumeSummaryName,
  hasJob,
  jobSummaryName,
  hasResult,
  onSelectScenario,
  isAnalyzing,
}) => {
  const scenarios = [
    {
      id: 'ml-senior',
      title: 'ML Engineer ↔ Senior ML Role',
      matchType: 'High Match (~88%)',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      resumeIdx: 0, // Alex Chen
      jobIdx: 0,    // Senior ML Engineer
      desc: 'Python, PyTorch, MLOps, NLP Transformers',
    },
    {
      id: 'fullstack-lead',
      title: 'Full-Stack Dev ↔ Senior Full-Stack',
      matchType: 'Strong Match (~82%)',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      resumeIdx: 1, // Sarah Jenkins
      jobIdx: 1,    // Senior Full-Stack
      desc: 'React, TypeScript, Node.js, GraphQL, AWS',
    },
    {
      id: 'junior-gap',
      title: 'Junior Dev ↔ Senior ML Role',
      matchType: 'Gap Analysis (~42%)',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      resumeIdx: 2, // Marcus Vance
      jobIdx: 0,    // Senior ML Engineer
      desc: 'Highlights critical missing skills & upskilling',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* 3-Step Guided Progress Bar */}
      <div className="px-5 py-3.5 bg-slate-50/70 border-b border-slate-200/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Easy 3-Step Matching Guide:</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1 md:pb-0">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                hasResume ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {hasResume ? '✓' : '1'}
            </span>
            <span className="font-semibold text-slate-700 whitespace-nowrap">
              Resume: <span className="font-normal text-slate-500">{resumeSummaryName}</span>
            </span>
          </div>

          <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                hasJob ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {hasJob ? '✓' : '2'}
            </span>
            <span className="font-semibold text-slate-700 whitespace-nowrap">
              Job Target: <span className="font-normal text-slate-500">{jobSummaryName}</span>
            </span>
          </div>

          <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />

          {/* Step 3 */}
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                hasResult ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {hasResult ? '✓' : '3'}
            </span>
            <span className="font-semibold text-slate-700 whitespace-nowrap">
              {hasResult ? 'Match Ready' : 'AI Analysis'}
            </span>
          </div>
        </div>
      </div>

      {/* 1-Click Try Preset Scenarios */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>One-Click Try: Instant Match Scenarios</span>
            </h3>
            <p className="text-xs text-slate-500">
              No files on hand? Click any sample pair below to instantly load and test the AI matcher:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              type="button"
              disabled={isAnalyzing}
              onClick={() => onSelectScenario(sc.resumeIdx, sc.jobIdx)}
              className="text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group cursor-pointer disabled:opacity-50 relative"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {sc.title}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${sc.badgeColor}`}>
                  {sc.matchType}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                {sc.desc}
              </p>
              <div className="mt-2 text-[11px] font-medium text-indigo-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Load & Test This Scenario</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
