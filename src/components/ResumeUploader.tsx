import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import { PRESET_RESUMES } from '../data/presets';

interface ResumeUploaderProps {
  resumeText: string;
  onTextChange: (text: string) => void;
  pdfBase64: string | null;
  onPdfChange: (base64: string | null, filename?: string) => void;
  isProcessingPdf: boolean;
  setIsProcessingPdf: (val: boolean) => void;
  privacyMode: boolean;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  resumeText,
  onTextChange,
  pdfBase64,
  onPdfChange,
  isProcessingPdf,
  setIsProcessingPdf,
  privacyMode,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [pdfPageCount, setPdfPageCount] = useState<number | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mask PII helper for live preview
  const getMaskedText = (text: string) => {
    return text
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED EMAIL]')
      .replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '[REDACTED PHONE]')
      .replace(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/gi, 'linkedin.com/in/[ANONYMIZED]')
      .replace(/github\.com\/[a-zA-Z0-9_-]+/gi, 'github.com/[ANONYMIZED]');
  };

  const handleFile = async (file: File) => {
    setErrorMessage(null);
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf') && !file.name.endsWith('.txt')) {
      setErrorMessage('Please upload a PDF document (.pdf) or text file (.txt)');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('File size exceeds 15MB limit.');
      return;
    }

    setUploadedFileName(file.name);

    if (file.name.endsWith('.txt')) {
      const text = await file.text();
      onTextChange(text);
      onPdfChange(null, file.name);
      return;
    }

    // Process PDF
    setIsProcessingPdf(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const resultBase64 = reader.result as string;
        onPdfChange(resultBase64, file.name);

        // Send to server to extract text for the user to view & edit if desired
        try {
          const res = await fetch('/api/extract-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pdfBase64: resultBase64 }),
          });
          const data = await res.json();
          if (res.ok && data.text) {
            onTextChange(data.text);
            setPdfPageCount(data.numpages || 1);
          } else {
            console.warn('PDF text extraction error details:', data.error);
          }
        } catch (apiErr) {
          console.warn('PDF parse API call failed, will use multimodal on server:', apiErr);
        } finally {
          setIsProcessingPdf(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setErrorMessage('Failed to read PDF file. Try pasting text directly.');
      setIsProcessingPdf(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = PRESET_RESUMES.find((r) => r.id === presetId);
    if (preset) {
      onTextChange(preset.content);
      onPdfChange(null, preset.filename);
      setUploadedFileName(preset.filename);
      setPdfPageCount(1);
      setErrorMessage(null);
    }
  };

  const wordCount = resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0;
  const displayedText = privacyMode ? getMaskedText(resumeText) : resumeText;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col h-full overflow-hidden">
      {/* Card Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Candidate Resume</span>
              {uploadedFileName && (
                <span className="text-xs font-normal text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Loaded
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500">Upload PDF resume or paste plain text</p>
          </div>
        </div>

        {/* Input Method Toggle & Clear */}
        <div className="flex items-center gap-2">
          {resumeText && (
            <button
              type="button"
              onClick={() => {
                onTextChange('');
                onPdfChange(null);
                setUploadedFileName(null);
                setPdfPageCount(null);
              }}
              className="text-[11px] text-slate-400 hover:text-rose-600 px-2 py-0.5 rounded hover:bg-rose-50 transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === 'upload' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PDF Upload
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === 'text' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Text Editor
            </button>
          </div>
        </div>
      </div>

      {/* Preset Selector Banner */}
      <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-2 flex-wrap text-xs">
        <span className="text-slate-500 font-medium flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Presets:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {PRESET_RESUMES.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset.id)}
              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 text-[11px] font-medium transition-colors cursor-pointer"
            >
              {preset.name} ({preset.id === 'alex-ml' ? 'ML/Python' : preset.id === 'sarah-fullstack' ? 'FullStack' : 'Junior'})
            </button>
          ))}
        </div>
      </div>

      {/* Body Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {errorMessage && (
          <div className="mb-3 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {activeTab === 'upload' ? (
          <div className="flex-1 flex flex-col">
            {/* Drag & drop upload box */}
            <div
              onDragEnter={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px] ${
                dragActive
                  ? 'border-indigo-500 bg-indigo-50/60'
                  : uploadedFileName
                  ? 'border-emerald-300 bg-emerald-50/20 hover:bg-emerald-50/40'
                  : 'border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,application/pdf,text/plain"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />

              {isProcessingPdf ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-medium text-slate-700">Extracting PDF text and parsing structure...</p>
                </div>
              ) : uploadedFileName ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{uploadedFileName}</p>
                    <p className="text-[11px] text-slate-500">
                      {pdfPageCount ? `${pdfPageCount} pages • ` : ''}
                      {wordCount} words extracted
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-indigo-600 hover:underline mt-1">
                    Click to replace PDF
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Drop your resume PDF here or <span className="text-indigo-600 underline">browse</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Supports PDF documents up to 15MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPreset('alex-ml');
                    }}
                    className="mt-1 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 transition-colors cursor-pointer"
                  >
                    ✨ Use Sample Resume (Alex Chen)
                  </button>
                </div>
              )}
            </div>

            {/* Extracted preview toggle if text exists */}
            {resumeText && (
              <div className="mt-3 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="font-medium flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-indigo-500" /> Extracted Text Preview
                  </span>
                  <div className="flex items-center gap-2">
                    {privacyMode && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        PII Redacted
                      </span>
                    )}
                    <span>{wordCount} words</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed select-text">
                  {displayedText.slice(0, 800)}
                  {displayedText.length > 800 ? '...' : ''}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span>Paste Resume Plain Text</span>
              <span>{wordCount} words</span>
            </div>
            <textarea
              value={resumeText}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Paste candidate resume text, including Summary, Skills, Experience, Education, and Projects..."
              rows={9}
              className="w-full flex-1 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-mono resize-none leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
};
