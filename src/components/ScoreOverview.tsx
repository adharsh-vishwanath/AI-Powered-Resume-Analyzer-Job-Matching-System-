import React from 'react';
import { CheckCircle2, XCircle, Award, Sparkles, TrendingUp, Cpu, FileCheck } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ScoreOverviewProps {
  result: AnalysisResult;
}

export const ScoreOverview: React.FC<ScoreOverviewProps> = ({ result }) => {
  const { overallMatchScore, scores, summaryVerdict, matchingSkills, missingSkills, atsAudit } = result;

  // Determine badge color and label
  let tierColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let tierLabel = 'Strong Match';
  let ringStroke = 'stroke-emerald-500';

  if (overallMatchScore >= 80) {
    tierColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    tierLabel = 'Strong Alignment';
    ringStroke = 'stroke-emerald-500';
  } else if (overallMatchScore >= 65) {
    tierColor = 'text-indigo-700 bg-indigo-50 border-indigo-200';
    tierLabel = 'Good Alignment';
    ringStroke = 'stroke-indigo-500';
  } else if (overallMatchScore >= 50) {
    tierColor = 'text-amber-700 bg-amber-50 border-amber-200';
    tierLabel = 'Moderate / Partial Match';
    ringStroke = 'stroke-amber-500';
  } else {
    tierColor = 'text-rose-700 bg-rose-50 border-rose-200';
    tierLabel = 'Skill & Experience Gaps';
    ringStroke = 'stroke-rose-500';
  }

  // Dimension cards config
  const dimensionItems = [
    {
      label: 'Semantic Embedding Similarity',
      score: scores.semanticSimilarity,
      description: 'NLP vector cosine similarity on meaning',
      icon: Cpu,
      color: 'text-violet-600 bg-violet-50',
    },
    {
      label: 'Hard Skills Match',
      score: scores.hardSkills,
      description: `${matchingSkills.length} matched / ${matchingSkills.length + missingSkills.length} required`,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      label: 'Experience & Seniority',
      score: scores.experience,
      description: 'Role relevance & project impact',
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'ATS Readiness',
      score: scores.atsReadiness || atsAudit.atsScore,
      description: `${atsAudit.rating} rating • ${atsAudit.quantifiableMetricsFound} metrics`,
      icon: FileCheck,
      color: 'text-indigo-600 bg-indigo-50',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Big Circular Overall Match Gauge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50/60 rounded-2xl border border-slate-100 text-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                className="stroke-slate-200"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                className={`${ringStroke} transition-all duration-1000 ease-out`}
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 50}
                strokeDashoffset={2 * Math.PI * 50 * (1 - overallMatchScore / 100)}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {overallMatchScore}%
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Fit Score
              </span>
            </div>
          </div>

          <div className="mt-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${tierColor}`}>
              {tierLabel}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Targeting: <span className="font-semibold text-slate-700">{result.targetRole || 'Target Role'}</span>
          </p>
        </div>

        {/* Right: Executive Recruiter Verdict & Metric Breakdown */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Recruiter Match Verdict
              </h3>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-medium bg-indigo-50/40 p-3.5 rounded-xl border border-indigo-100/80">
              {summaryVerdict}
            </p>
          </div>

          {/* 4 Dimension mini cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {dimensionItems.map((dim, idx) => {
              const Icon = dim.icon;
              return (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-xl border border-slate-200/80 hover:border-indigo-200 transition-all shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-1.5 rounded-lg ${dim.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">{dim.score}%</span>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-semibold text-slate-700 line-clamp-1">
                      {dim.label}
                    </h4>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {dim.description}
                    </p>
                  </div>
                  {/* Small progress line */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(0, dim.score))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
