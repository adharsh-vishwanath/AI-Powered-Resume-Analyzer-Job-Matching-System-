import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Briefcase,
  Copy,
  Check,
  Download,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileCheck,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface SimpleSummaryViewProps {
  result: AnalysisResult;
  onOpenDetailedTab: (tabId: string) => void;
  onOpenExportModal: () => void;
}

export const SimpleSummaryView: React.FC<SimpleSummaryViewProps> = ({
  result,
  onOpenDetailedTab,
  onOpenExportModal,
}) => {
  const [copied, setCopied] = useState(false);

  const {
    overallMatchScore,
    candidateName,
    targetRole,
    matchingSkills,
    missingSkills,
    experienceAnalysis,
    summaryVerdict,
    atsAudit,
    responsibleAI,
  } = result;

  // Format quick copy text exactly matching standard output
  const plainTextSummary = `Resume Analysis
----------------------------

Overall Fit Score: ${overallMatchScore}% (${overallMatchScore >= 80 ? 'Strong Alignment' : overallMatchScore >= 65 ? 'Good Alignment' : 'Partial Match'})
Target Role: ${targetRole}
Candidate: ${candidateName}

Matching Skills:
${matchingSkills.map((s) => `✓ ${s.name}`).join('\n') || 'None identified'}

Missing Skills:
${missingSkills.map((s) => `✗ ${s.name} (${s.importance.toUpperCase()})`).join('\n') || 'None identified'}

Relevant Experience:
${experienceAnalysis.map((e) => `✓ ${e.title} (${e.relevanceScore}% match)`).join('\n') || 'Not extracted'}

Job Match Analysis:
${summaryVerdict}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(plainTextSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200 ring-emerald-500';
    if (score >= 65) return 'text-indigo-700 bg-indigo-50 border-indigo-200 ring-indigo-500';
    if (score >= 50) return 'text-amber-700 bg-amber-50 border-amber-200 ring-amber-500';
    return 'text-rose-700 bg-rose-50 border-rose-200 ring-rose-500';
  };

  const getScoreTier = (score: number) => {
    if (score >= 80) return 'Strong Alignment';
    if (score >= 65) return 'Good Alignment';
    if (score >= 50) return 'Partial Fit';
    return 'Gaps Identified';
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Banner: Overall Fit & One-Click Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="flex flex-col items-center justify-center h-20 w-20 rounded-2xl bg-indigo-600 text-white font-black text-2xl shadow-md shrink-0">
              <span>{overallMatchScore}%</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-indigo-200">FIT</span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getScoreColor(overallMatchScore)}`}>
                  {getScoreTier(overallMatchScore)}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {matchingSkills.length} of {matchingSkills.length + missingSkills.length} key skills satisfied
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {candidateName}{' '}
                <span className="text-slate-400 font-normal">for</span>{' '}
                <span className="text-indigo-600">{targetRole}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Summary Copied!' : 'Copy Quick Summary'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Full Report</span>
            </button>
          </div>
        </div>

        {/* Quick metric highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-100">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400">Hard Skills</span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{matchingSkills.length} Matched</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400">Missing Gaps</span>
            <p className="text-sm font-bold text-rose-600 mt-0.5">{missingSkills.length} Skills</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400">ATS Readiness</span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{atsAudit.atsScore}/100 ({atsAudit.rating})</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400">AI Fairness Score</span>
            <p className="text-sm font-bold text-emerald-600 mt-0.5">{responsibleAI.fairnessScore}% Bias-Free</p>
          </div>
        </div>
      </div>

      {/* Recruiter Job Match Analysis Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Job Match Analysis & Executive Verdict
          </h3>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed bg-indigo-50/40 p-4 rounded-xl border border-indigo-100/60">
          {summaryVerdict}
        </p>
      </div>

      {/* Two Column Grid: Matching Skills vs Missing Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Matching Skills */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Matching Skills ({matchingSkills.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onOpenDetailedTab('skills')}
              className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-0.5 cursor-pointer"
            >
              <span>Skills Matrix</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 flex-1 content-start">
            {matchingSkills.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4">No direct matching skills detected.</p>
            ) : (
              matchingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900"
                >
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{skill.name}</span>
                  {skill.matchType === 'semantic' && (
                    <span className="text-[10px] text-purple-700 bg-purple-100/80 px-1 py-0.2 rounded">
                      semantic
                    </span>
                  )}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Right: Missing Skills */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-rose-100 text-rose-700">
                <XCircle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Missing Skills & Gaps ({missingSkills.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onOpenDetailedTab('skills')}
              className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-0.5 cursor-pointer"
            >
              <span>View Upskilling</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2 flex-1">
            {missingSkills.length === 0 ? (
              <p className="text-xs text-emerald-600 font-medium py-4">
                🎉 No missing required skills identified for this job!
              </p>
            ) : (
              missingSkills.map((skill, idx) => {
                const badge =
                  skill.importance === 'critical'
                    ? 'bg-rose-100 text-rose-800 border-rose-200'
                    : skill.importance === 'important'
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200';

                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-start justify-between gap-2 text-xs"
                  >
                    <div className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold mt-0.5">✗</span>
                      <div>
                        <span className="font-semibold text-slate-900">{skill.name}</span>
                        {skill.recommendation && (
                          <p className="text-[11px] text-slate-500 mt-0.5">{skill.recommendation}</p>
                        )}
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border shrink-0 ${badge}`}>
                      {skill.importance}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Relevant Experience Alignment */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-blue-100 text-blue-700">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Relevant Experience ({experienceAnalysis.length} Roles Evaluated)
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onOpenDetailedTab('experience')}
            className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-0.5 cursor-pointer"
          >
            <span>Detailed Experience</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {experienceAnalysis.map((exp, idx) => (
            <div key={idx} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>✓ {exp.title}</span>
                  {exp.company && <span className="text-slate-500 font-normal">at {exp.company}</span>}
                </h4>
                {exp.keyAchievements && exp.keyAchievements.length > 0 && (
                  <p className="text-[11px] text-slate-600 mt-1 pl-3">
                    • {exp.keyAchievements[0]}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <span className="text-[11px] text-slate-400">Match:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {exp.relevanceScore}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
