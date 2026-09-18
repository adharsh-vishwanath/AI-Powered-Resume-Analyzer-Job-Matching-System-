import React, { useRef } from 'react';
import { Briefcase, Sparkles, ArrowRight, Loader2, Upload } from 'lucide-react';
import { PRESET_JOBS } from '../data/presets';

interface JobDescriptionInputProps {
  jobText: string;
  onJobChange: (text: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  canAnalyze: boolean;
  analysisStep: string;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jobText,
  onJobChange,
  onAnalyze,
  isAnalyzing,
  canAnalyze,
  analysisStep,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectPreset = (presetId: string) => {
    const preset = PRESET_JOBS.find((j) => j.id === presetId);
    if (preset) {
      onJobChange(preset.description);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const text = await file.text();
      onJobChange(text);
    }
  };

  const wordCount = jobText.trim() ? jobText.trim().split(/\s+/).length : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col h-full overflow-hidden">
      {/* Card Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Target Job Description</span>
              {wordCount > 10 && (
                <span className="text-xs font-normal text-emerald-600 flex items-center gap-1">
                  ✓ Loaded
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500">Paste job requirements, responsibilities & qualifications</p>
          </div>
        </div>

        {/* Upload JD text file & Clear */}
        <div className="flex items-center gap-2">
          {jobText && (
            <button
              type="button"
              onClick={() => onJobChange('')}
              className="text-[11px] text-slate-400 hover:text-rose-600 px-2 py-0.5 rounded hover:bg-rose-50 transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md"
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <Upload className="w-3 h-3" />
            <span>Upload JD file</span>
          </button>
        </div>
      </div>

      {/* Preset Selector Banner */}
      <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-2 flex-wrap text-xs">
        <span className="text-slate-500 font-medium flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5 text-violet-500" /> Presets:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {PRESET_JOBS.map((job) => (
            <button
              key={job.id}
              type="button"
              onClick={() => handleSelectPreset(job.id)}
              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:border-violet-300 hover:text-violet-600 text-[11px] font-medium transition-colors cursor-pointer"
            >
              {job.title.split(' ')[0]} {job.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Body Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="flex-1 flex flex-col mb-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span>Job Description Content</span>
            <span>{wordCount} words</span>
          </div>
          <textarea
            value={jobText}
            onChange={(e) => onJobChange(e.target.value)}
            placeholder="Paste complete job description here, including Required Skills, Responsibilities, Preferred Qualifications, and Tech Stack..."
            rows={9}
            className="w-full flex-1 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 font-mono resize-none leading-relaxed min-h-[160px]"
          />
        </div>

        {/* Big Action Button */}
        <button
          type="button"
          onClick={onAnalyze}
          disabled={!canAnalyze || isAnalyzing}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
            !canAnalyze
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              : isAnalyzing
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white opacity-90 cursor-wait'
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-indigo-200 hover:shadow-lg'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>{analysisStep || 'Analyzing Resume & Semantic Matching...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Analyze Resume & Calculate Job Match</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
