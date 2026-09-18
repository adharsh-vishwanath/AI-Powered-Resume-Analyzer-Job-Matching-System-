import React from 'react';
import { FileCheck, AlertTriangle, CheckCircle2, Lightbulb, ArrowRight, TrendingUp, ShieldAlert } from 'lucide-react';
import { ATSAudit, ImprovementSuggestion } from '../types';

interface ATSAuditViewProps {
  atsAudit: ATSAudit;
  improvements: ImprovementSuggestion[];
}

export const ATSAuditView: React.FC<ATSAuditViewProps> = ({ atsAudit, improvements }) => {
  const {
    atsScore,
    rating,
    bulletPointImpactScore,
    formattingReadabilityScore,
    keywordDensityScore,
    strengths,
    warnings,
    quantifiableMetricsFound,
  } = atsAudit;

  const ratingColor =
    atsScore >= 85
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
      : atsScore >= 70
      ? 'text-indigo-700 bg-indigo-50 border-indigo-200'
      : 'text-amber-700 bg-amber-50 border-amber-200';

  return (
    <div className="space-y-6">
      {/* ATS Score Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xl">
              {atsScore}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">ATS Parseability Score</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${ratingColor}`}>
                  {rating}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Evaluation of resume structure, parser compatibility, keyword frequency & quantifiable metrics
              </p>
            </div>
          </div>

          {/* Metric count indicator */}
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="text-xs font-bold text-slate-900">{quantifiableMetricsFound} Metrics Found</span>
              <p className="text-[10px] text-slate-500">Percentages, dollars & numbers</p>
            </div>
          </div>
        </div>

        {/* 3 Sub-scores */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-600 font-medium">Bullet Impact & Action Verbs</span>
              <span className="font-bold text-slate-900">{bulletPointImpactScore}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full"
                style={{ width: `${bulletPointImpactScore}%` }}
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-600 font-medium">Formatting & Section Headers</span>
              <span className="font-bold text-slate-900">{formattingReadabilityScore}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{ width: `${formattingReadabilityScore}%` }}
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-600 font-medium">Target Keyword Density</span>
              <span className="font-bold text-slate-900">{keywordDensityScore}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-violet-600 h-full rounded-full"
                style={{ width: `${keywordDensityScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Strengths & Warnings Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-100">
          <div>
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> ATS Strengths
            </h4>
            <ul className="space-y-1.5">
              {strengths.map((str, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> ATS Warnings & Recommendations
            </h4>
            <ul className="space-y-1.5">
              {warnings.map((warn, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                  <span className="text-amber-500 font-bold">!</span>
                  <span>{warn}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Suggested Areas for Resume Improvement (Before & After Rewrites) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Actionable Resume Bullet Point Enhancements
              </h3>
              <p className="text-xs text-slate-500">
                AI-crafted high-impact rewrites incorporating target keywords and quantifiable metrics
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {improvements.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400">
              No specific bullet points required immediate rewriting.
            </div>
          ) : (
            improvements.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    Target Skill: {item.targetSkill}
                  </span>
                  <span className="text-[11px] text-slate-500 italic">
                    Reason: {item.reason}
                  </span>
                </div>

                {item.originalBullet && (
                  <div className="text-xs text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200 line-through">
                    <span className="font-semibold text-slate-600 not-italic">Before: </span>
                    {item.originalBullet}
                  </div>
                )}

                {item.improvedBullet && (
                  <div className="text-xs text-emerald-900 bg-emerald-50/70 p-3 rounded-lg border border-emerald-200 font-medium">
                    <span className="font-bold text-emerald-700 flex items-center gap-1 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Recommended ATS High-Impact Rewrite:
                    </span>
                    {item.improvedBullet}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
