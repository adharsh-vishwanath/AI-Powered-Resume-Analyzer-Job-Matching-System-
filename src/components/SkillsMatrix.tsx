import React, { useState } from 'react';
import { CheckCircle2, XCircle, Sparkles, Filter, Info, PlusCircle } from 'lucide-react';
import { SkillItem, MissingSkillItem } from '../types';

interface SkillsMatrixProps {
  matchingSkills: SkillItem[];
  missingSkills: MissingSkillItem[];
  additionalSkills: string[];
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({
  matchingSkills,
  missingSkills,
  additionalSkills,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'language', label: 'Languages' },
    { id: 'framework', label: 'Frameworks / ML' },
    { id: 'cloud_tool', label: 'Cloud & DevOps' },
    { id: 'methodology', label: 'Architecture & Methods' },
    { id: 'soft_skill', label: 'Soft Skills' },
  ];

  // Filter skills
  const filteredMatching = matchingSkills.filter((s) => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.matchedWith && s.matchedWith.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const filteredMissing = missingSkills.filter((s) => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Category Pills and Search Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Filter skills by keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-56 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        />
      </div>

      {/* Two Column Grid: Matching Skills vs Missing Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Matching Skills */}
        <div className="bg-white rounded-2xl border border-emerald-200/80 shadow-xs overflow-hidden">
          <div className="p-4 bg-emerald-50/50 border-b border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Matching Skills ({filteredMatching.length})
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              Satisfied Requirements
            </span>
          </div>

          <div className="p-4 divide-y divide-slate-100 max-h-[480px] overflow-y-auto">
            {filteredMatching.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No matching skills found matching the current filter.
              </div>
            ) : (
              filteredMatching.map((skill, idx) => (
                <div key={idx} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="text-sm font-semibold text-slate-900">{skill.name}</span>
                      {skill.matchType === 'semantic' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200" title="Semantic match: related meaning recognized by AI embeddings">
                          Semantic Match
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100">
                      {skill.category.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Semantic equivalence note */}
                  {skill.matchedWith && (
                    <div className="mt-1 text-xs text-slate-500 flex items-center gap-1.5 pl-4">
                      <span className="text-slate-400">Matched with:</span>
                      <span className="font-medium text-slate-700 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/60">
                        {skill.matchedWith}
                      </span>
                    </div>
                  )}

                  {skill.explanation && (
                    <p className="mt-1 text-xs text-slate-600 pl-4 italic">
                      "{skill.explanation}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Missing Skills */}
        <div className="bg-white rounded-2xl border border-rose-200/80 shadow-xs overflow-hidden">
          <div className="p-4 bg-rose-50/50 border-b border-rose-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-rose-100 text-rose-700">
                <XCircle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Missing Skills & Gaps ({filteredMissing.length})
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-full">
              Action Required
            </span>
          </div>

          <div className="p-4 divide-y divide-slate-100 max-h-[480px] overflow-y-auto">
            {filteredMissing.length === 0 ? (
              <div className="py-8 text-center text-xs text-emerald-600 font-medium">
                🎉 No missing required skills identified for this position!
              </div>
            ) : (
              filteredMissing.map((skill, idx) => {
                const importanceBadge =
                  skill.importance === 'critical'
                    ? 'bg-rose-100 text-rose-800 border-rose-200'
                    : skill.importance === 'important'
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200';

                return (
                  <div key={idx} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-rose-500 font-bold">✗</span>
                        <span className="text-sm font-semibold text-slate-900">{skill.name}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${importanceBadge}`}>
                        {skill.importance}
                      </span>
                    </div>

                    {skill.recommendation && (
                      <div className="mt-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 pl-3">
                        <span className="font-semibold text-slate-700">Suggestion: </span>
                        {skill.recommendation}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Additional Candidate Strengths */}
      {additionalSkills && additionalSkills.length > 0 && (
        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900">
              Additional Candidate Strengths (Not specifically requested in JD):
            </h4>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {additionalSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-xs font-medium text-indigo-800 shadow-2xs"
              >
                + {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
