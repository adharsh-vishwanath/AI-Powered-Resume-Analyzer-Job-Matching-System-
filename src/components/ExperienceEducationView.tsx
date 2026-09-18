import React from 'react';
import { Briefcase, GraduationCap, CheckCircle2, Award, Calendar, Building2 } from 'lucide-react';
import { ExperienceItem, EducationItem } from '../types';

interface ExperienceEducationViewProps {
  experienceList: ExperienceItem[];
  educationList: EducationItem[];
}

export const ExperienceEducationView: React.FC<ExperienceEducationViewProps> = ({
  experienceList,
  educationList,
}) => {
  return (
    <div className="space-y-6">
      {/* Experience Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Work Experience Alignment</h3>
              <p className="text-xs text-slate-500">
                Evaluation of past roles, seniority, and project achievements against target role
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 divide-y divide-slate-100">
          {experienceList.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400">
              No detailed experience items extracted.
            </div>
          ) : (
            experienceList.map((exp, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>{exp.title}</span>
                      {exp.company && (
                        <span className="text-xs font-normal text-slate-500 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" /> {exp.company}
                        </span>
                      )}
                    </h4>
                    {exp.duration && (
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" /> {exp.duration}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs text-slate-500">Relevance:</span>
                    <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {exp.relevanceScore}%
                    </span>
                  </div>
                </div>

                {/* Key achievements */}
                {exp.keyAchievements && exp.keyAchievements.length > 0 && (
                  <ul className="space-y-1 pl-2">
                    {exp.keyAchievements.map((ach, aIdx) => (
                      <li key={aIdx} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Matched keywords */}
                {exp.matchedKeywords && exp.matchedKeywords.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                      Keywords matched:
                    </span>
                    {exp.matchedKeywords.map((kw, kwIdx) => (
                      <span
                        key={kwIdx}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Education & Credentials</h3>
              <p className="text-xs text-slate-500">
                Degrees, certifications, and academic discipline alignment
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 divide-y divide-slate-100">
          {educationList.length === 0 ? (
            <div className="py-4 text-center text-xs text-slate-400">
              No formal degree requirements specified or extracted.
            </div>
          ) : (
            educationList.map((edu, idx) => {
              const alignmentBadge =
                edu.alignment === 'exceeds_requirement'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : edu.alignment === 'meets_requirement'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200';

              const alignmentLabel =
                edu.alignment === 'exceeds_requirement'
                  ? 'Exceeds Requirement'
                  : edu.alignment === 'meets_requirement'
                  ? 'Meets Requirement'
                  : 'Alternative Discipline';

              return (
                <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                    <p className="text-xs text-slate-500">
                      {edu.field ? `${edu.field} • ` : ''}
                      {edu.institution || 'Accredited Institution'}
                      {edu.graduationYear ? ` (${edu.graduationYear})` : ''}
                    </p>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border self-start sm:self-auto ${alignmentBadge}`}>
                    {alignmentLabel}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
