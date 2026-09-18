import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, result }) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'plain' | 'markdown'>('plain');

  if (!isOpen) return null;

  // Format 1: Exact format requested in the prompt
  const plainTextReport = `Resume Analysis
----------------------------

Overall Fit Score: ${result.overallMatchScore}% (${result.scores.overall >= 80 ? 'Strong Alignment' : result.scores.overall >= 65 ? 'Good Alignment' : 'Partial Match'})
Target Role: ${result.targetRole}
Candidate: ${result.candidateName}

Matching Skills:
${result.matchingSkills.map((s) => `✓ ${s.name}`).join('\n') || 'None identified'}

Missing Skills:
${result.missingSkills.map((s) => `✗ ${s.name} (${s.importance.toUpperCase()})`).join('\n') || 'None identified'}

Relevant Experience:
${result.experienceAnalysis.map((e) => `✓ ${e.title} (${e.relevanceScore}% match)`).join('\n') || 'Not extracted'}

Job Match Analysis:
${result.summaryVerdict}

ATS Readiness Score: ${result.atsAudit.atsScore}/100 (${result.atsAudit.rating})
Responsible AI Fairness Score: ${result.responsibleAI.fairnessScore}/100
Semantic Cosine Distance: ${result.semanticVectorAnalysis.cosineSimilarity.toFixed(3)}
`;

  // Format 2: Full Markdown report
  const markdownReport = `# AI Resume & Job Matching Report

**Candidate:** ${result.candidateName}  
**Target Role:** ${result.targetRole}  
**Overall Match Score:** ${result.overallMatchScore}%  
**Generated At:** ${new Date(result.analyzedAt).toLocaleString()}  

---

## 📊 Executive Summary
${result.summaryVerdict}

## 🎯 Dimensional Alignment
- **Semantic Cosine Similarity:** ${Math.round(result.semanticVectorAnalysis.cosineSimilarity * 100)}% (${result.semanticVectorAnalysis.cosineSimilarity.toFixed(3)})
- **Hard Skills Match:** ${result.scores.hardSkills}%
- **Experience Alignment:** ${result.scores.experience}%
- **ATS Parseability:** ${result.atsAudit.atsScore}%
- **Responsible AI Fairness:** ${result.responsibleAI.fairnessScore}%

## ✅ Matching Skills (${result.matchingSkills.length})
${result.matchingSkills.map((s) => `- **${s.name}** (${s.category}): Matched with *${s.matchedWith || 'Requirement'}*`).join('\n')}

## ❌ Missing Skills (${result.missingSkills.length})
${result.missingSkills.map((s) => `- **${s.name}** [${s.importance.toUpperCase()}]: ${s.recommendation}`).join('\n')}

## 💼 Relevant Experience
${result.experienceAnalysis.map((e) => `### ${e.title} - ${e.company || ''} (${e.duration || ''})\n- Relevance: ${e.relevanceScore}%\n${e.keyAchievements.map((a) => `  - ${a}`).join('\n')}`).join('\n\n')}

## 💡 Top Improvement Recommendations
${result.improvements.map((imp) => `- **${imp.targetSkill}:** ${imp.improvedBullet} *(Reason: ${imp.reason})*`).join('\n')}
`;

  const activeContent = exportFormat === 'plain' ? plainTextReport : markdownReport;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Resume_Analysis_${result.candidateName.replace(/\s+/g, '_')}.${exportFormat === 'markdown' ? 'md' : 'txt'}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Export Analysis Report</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setExportFormat('plain')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  exportFormat === 'plain'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Standard Output (Text)
              </button>
              <button
                type="button"
                onClick={() => setExportFormat('markdown')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  exportFormat === 'markdown'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Markdown Report (.md)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed border border-slate-800">
            {activeContent}
          </pre>
        </div>
      </div>
    </div>
  );
};
