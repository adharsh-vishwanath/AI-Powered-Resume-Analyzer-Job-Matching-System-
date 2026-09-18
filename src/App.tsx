import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Download,
  Share2,
  FileCheck,
  ShieldCheck,
  Briefcase,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Header } from './components/Header';
import { ResumeUploader } from './components/ResumeUploader';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { ScoreOverview } from './components/ScoreOverview';
import { SkillsMatrix } from './components/SkillsMatrix';
import { SemanticEmbeddingView } from './components/SemanticEmbeddingView';
import { ExperienceEducationView } from './components/ExperienceEducationView';
import { ATSAuditView } from './components/ATSAuditView';
import { ResponsibleAICheckView } from './components/ResponsibleAICheckView';
import { ExportModal } from './components/ExportModal';
import { QuickStartBanner } from './components/QuickStartBanner';
import { SimpleSummaryView } from './components/SimpleSummaryView';
import { PRESET_RESUMES, PRESET_JOBS } from './data/presets';
import { AnalysisResult } from './types';

export default function App() {
  const [resumeText, setResumeText] = useState<string>(PRESET_RESUMES[0].content);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [jobText, setJobText] = useState<string>(PRESET_JOBS[0].description);
  const [isProcessingPdf, setIsProcessingPdf] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(true);
  const [privacyMode, setPrivacyMode] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'simple' | 'detailed'>('simple');
  const [activeTab, setActiveTab] = useState<'skills' | 'semantic' | 'experience' | 'ats' | 'responsible_ai'>('skills');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check health on mount
  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => {
        setHasGeminiKey(d.hasGeminiKey);
      })
      .catch((err) => {
        console.warn('Health check error:', err);
      });

    // Auto trigger initial analysis for instant demo preview
    handleAnalyze();
  }, []);

  const handleAnalyze = async (overrideResume?: string, overrideJob?: string) => {
    const currentResume = overrideResume !== undefined ? overrideResume : resumeText;
    const currentJob = overrideJob !== undefined ? overrideJob : jobText;
    const currentPdf = overrideResume !== undefined ? null : pdfBase64;

    if (!currentJob.trim() || (!currentResume.trim() && !currentPdf)) {
      setErrorMsg('Please ensure both resume content and job description are provided.');
      return;
    }

    setErrorMsg(null);
    setIsAnalyzing(true);
    setAnalysisStep('Reading resume & job specifications...');

    // Progress ticker for smooth responsive UX
    const stepTimer1 = setTimeout(() => {
      setAnalysisStep('Generating 768-dim dense vector embeddings...');
    }, 900);

    const stepTimer2 = setTimeout(() => {
      setAnalysisStep('Calculating cosine similarity & semantic skill equivalence...');
    }, 2000);

    const stepTimer3 = setTimeout(() => {
      setAnalysisStep('Running ATS audit & responsible AI fairness checks...');
    }, 3200);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: currentResume,
          jobDescription: currentJob,
          pdfBase64: currentPdf,
          privacyMode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete resume analysis.');
      }

      setResult(data);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMsg(err.message || 'An unexpected error occurred during analysis.');
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  const handleReset = () => {
    setResumeText('');
    setPdfBase64(null);
    setJobText('');
    setResult(null);
    setErrorMsg(null);
  };

  const handleLoadSample = () => {
    const resumePreset = PRESET_RESUMES[0];
    const jobPreset = PRESET_JOBS[0];
    setResumeText(resumePreset.content);
    setPdfBase64(null);
    setJobText(jobPreset.description);
    setErrorMsg(null);
    handleAnalyze(resumePreset.content, jobPreset.description);
  };

  const handleSelectScenario = (resumeIdx: number, jobIdx: number) => {
    const resumePreset = PRESET_RESUMES[resumeIdx];
    const jobPreset = PRESET_JOBS[jobIdx];
    setResumeText(resumePreset.content);
    setPdfBase64(null);
    setJobText(jobPreset.description);
    setErrorMsg(null);
    handleAnalyze(resumePreset.content, jobPreset.description);
  };

  const getResumeSummaryName = () => {
    if (pdfBase64) return 'Uploaded PDF';
    if (!resumeText.trim()) return 'None';
    if (resumeText.includes('ALEX CHEN')) return 'Alex Chen (ML)';
    if (resumeText.includes('SARAH JENKINS')) return 'Sarah Jenkins (FullStack)';
    if (resumeText.includes('MARCUS VANCE')) return 'Marcus Vance (Junior)';
    const words = resumeText.trim().split(/\s+/).length;
    return `${words} words`;
  };

  const getJobSummaryName = () => {
    if (!jobText.trim()) return 'None';
    if (jobText.includes('Apex AI Labs') || jobText.includes('Machine Learning Engineer')) return 'Senior ML Role';
    if (jobText.includes('CloudScale') || jobText.includes('Full-Stack')) return 'Senior Full-Stack';
    if (jobText.includes('Data Platform') || jobText.includes('Data Engineer')) return 'Data Engineer';
    const words = jobText.trim().split(/\s+/).length;
    return `${words} words`;
  };

  const tabs = [
    {
      id: 'skills',
      label: 'Skills Matrix',
      icon: CheckCircle2,
      badge: result ? `${result.matchingSkills.length} Matched` : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'semantic',
      label: 'AI Embeddings & NLP',
      icon: Cpu,
      badge: result ? `${Math.round(result.semanticVectorAnalysis.cosineSimilarity * 100)}% Sim` : undefined,
      badgeColor: 'bg-violet-100 text-violet-800',
    },
    {
      id: 'experience',
      label: 'Experience & Education',
      icon: Briefcase,
    },
    {
      id: 'ats',
      label: 'ATS Audit & Rewrites',
      icon: FileCheck,
      badge: result ? `${result.atsAudit.atsScore} ATS` : undefined,
      badgeColor: 'bg-indigo-100 text-indigo-800',
    },
    {
      id: 'responsible_ai',
      label: 'Responsible AI & Privacy',
      icon: ShieldCheck,
      badge: result ? `${result.responsibleAI.fairnessScore}% Fair` : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation & Header */}
      <Header
        hasGeminiKey={hasGeminiKey}
        privacyMode={privacyMode}
        onTogglePrivacy={() => setPrivacyMode(!privacyMode)}
        onReset={handleReset}
        onLoadSample={handleLoadSample}
        isAnalyzing={isAnalyzing}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Error Banner if any */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-700 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Analysis Notice</p>
              <p className="text-xs text-rose-600 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* 1-2-3 Guided Flow & Instant Match Scenarios Banner */}
        <QuickStartBanner
          hasResume={Boolean(resumeText.trim() || pdfBase64)}
          resumeSummaryName={getResumeSummaryName()}
          hasJob={Boolean(jobText.trim())}
          jobSummaryName={getJobSummaryName()}
          hasResult={Boolean(result)}
          onSelectScenario={handleSelectScenario}
          isAnalyzing={isAnalyzing}
        />

        {/* Input Phase: 2 Columns (Resume vs Job Description) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <ResumeUploader
            resumeText={resumeText}
            onTextChange={setResumeText}
            pdfBase64={pdfBase64}
            onPdfChange={(b64) => setPdfBase64(b64)}
            isProcessingPdf={isProcessingPdf}
            setIsProcessingPdf={setIsProcessingPdf}
            privacyMode={privacyMode}
          />

          <JobDescriptionInput
            jobText={jobText}
            onJobChange={setJobText}
            onAnalyze={() => handleAnalyze()}
            isAnalyzing={isAnalyzing}
            canAnalyze={Boolean(jobText.trim() && (resumeText.trim() || pdfBase64))}
            analysisStep={analysisStep}
          />
        </section>

        {/* Results Section */}
        {result && (
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 pt-2"
          >
            {/* Top Bar with Candidate/Job Title, Mode Switcher & Export */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  Analysis Results
                </span>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>{result.candidateName}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 font-normal">{result.targetRole}</span>
                </h2>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* View Mode Switcher: Easy Summary vs Deep Analytics */}
                <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setViewMode('simple')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      viewMode === 'simple'
                        ? 'bg-white text-indigo-700 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Easy Summary</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('detailed')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      viewMode === 'detailed'
                        ? 'bg-white text-indigo-700 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-violet-600" />
                    <span>Deep Analytics ({tabs.length} Tabs)</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExportOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Mode-Specific Content */}
            {viewMode === 'simple' ? (
              <SimpleSummaryView
                result={result}
                onOpenDetailedTab={(tabId) => {
                  setViewMode('detailed');
                  setActiveTab(tabId as any);
                }}
                onOpenExportModal={() => setIsExportOpen(true)}
              />
            ) : (
              <div className="space-y-6">
                {/* Score Overview & Recruiter Verdict */}
                <ScoreOverview result={result} />

                {/* Navigation Tabs for Deep-Dive */}
                <div className="border-b border-slate-200">
                  <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-1" aria-label="Tabs">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`py-3 px-3.5 inline-flex items-center gap-2 border-b-2 font-semibold text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer ${
                            isActive
                              ? 'border-indigo-600 text-indigo-600 font-bold'
                              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                          {tab.badge && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tab.badgeColor || 'bg-slate-100 text-slate-600'}`}>
                              {tab.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Tab Views */}
                <div className="pt-2">
                  <AnimatePresence mode="wait">
                    {activeTab === 'skills' && (
                      <motion.div
                        key="skills"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <SkillsMatrix
                          matchingSkills={result.matchingSkills}
                          missingSkills={result.missingSkills}
                          additionalSkills={result.additionalCandidateSkills}
                        />
                      </motion.div>
                    )}

                    {activeTab === 'semantic' && (
                      <motion.div
                        key="semantic"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <SemanticEmbeddingView vectorData={result.semanticVectorAnalysis} />
                      </motion.div>
                    )}

                    {activeTab === 'experience' && (
                      <motion.div
                        key="experience"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ExperienceEducationView
                          experienceList={result.experienceAnalysis}
                          educationList={result.educationAnalysis}
                        />
                      </motion.div>
                    )}

                    {activeTab === 'ats' && (
                      <motion.div
                        key="ats"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ATSAuditView
                          atsAudit={result.atsAudit}
                          improvements={result.improvements}
                        />
                      </motion.div>
                    )}

                    {activeTab === 'responsible_ai' && (
                      <motion.div
                        key="responsible_ai"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ResponsibleAICheckView
                          responsibleAI={result.responsibleAI}
                          privacyMode={privacyMode}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </motion.section>
        )}
      </main>

      {/* Export Report Modal */}
      {result && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          result={result}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>
            AI-Powered Resume Analyzer & Job Matching System • Dense Embeddings & Responsible AI
          </p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Powered by Gemini 3.8 Flash & Vector Embeddings</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
