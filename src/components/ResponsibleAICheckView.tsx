import React from 'react';
import { ShieldCheck, Lock, Eye, AlertCircle, CheckCircle2, UserCheck, DatabaseZap } from 'lucide-react';
import { ResponsibleAICheck } from '../types';

interface ResponsibleAICheckViewProps {
  responsibleAI: ResponsibleAICheck;
  privacyMode: boolean;
}

export const ResponsibleAICheckView: React.FC<ResponsibleAICheckViewProps> = ({
  responsibleAI,
  privacyMode,
}) => {
  const { fairnessScore, detectedBiasesOrProxies = [], inclusiveLanguageRating, privacySummary } = responsibleAI;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
              {fairnessScore}%
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Responsible AI & Fairness Rating</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {inclusiveLanguageRating} Language
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Audited against demographic proxies, age signals, and unconscious bias markers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Bias Screening Active</span>
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Bias & Proxy Detection vs Secure Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bias & Demographic Signals Detected */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <UserCheck className="w-4 h-4 text-indigo-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Bias Signals & Demographic Auditing
            </h4>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Resumes often contain unintentional proxy markers that trigger human or algorithmic bias (e.g. outdated graduation dates, gendered phrasing, or home address proximity).
          </p>

          {detectedBiasesOrProxies.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">No Demographic Proxy Signals Flagged</p>
                <p className="text-emerald-700 mt-0.5">
                  The resume is focused primarily on verifiable technical competencies, projects, and impact metrics.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {detectedBiasesOrProxies.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-800 uppercase tracking-wider text-[10px]">
                      Proxy Type: {item.type}
                    </span>
                  </div>
                  <p className="text-slate-700">
                    <span className="font-semibold">Detected phrase: </span>
                    <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-mono">
                      "{item.textFound}"
                    </code>
                  </p>
                  <p className="text-slate-600 pt-1">
                    <span className="font-semibold text-slate-700">Fairness Recommendation: </span>
                    {item.suggestion}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Secure Data Handling & Privacy-Focused Architecture */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Privacy-Focused Architecture & Data Handling
            </h4>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Our resume processing pipeline adheres to responsible AI data governance principles:
          </p>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="p-1 rounded-md bg-emerald-100 text-emerald-700 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Zero Persistent Storage</h5>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Candidate resumes and job descriptions are evaluated in-memory ephemerally and are never stored in a database or retained on disk.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="p-1 rounded-md bg-indigo-100 text-indigo-700 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">No Foundation Model Training</h5>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Uploaded documents are never used to train public machine learning models or sentence transformer weights.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="p-1 rounded-md bg-violet-100 text-violet-700 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">
                  PII Masking / Blind Screening Mode
                </h5>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Toggle on the top toolbar redacts names, emails, phone numbers, and institution brand markers before evaluation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
