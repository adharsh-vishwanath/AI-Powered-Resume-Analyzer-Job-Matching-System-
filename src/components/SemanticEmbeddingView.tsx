import React from 'react';
import { Cpu, Zap, ArrowRight, Layers, HelpCircle, Binary } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { SemanticVectorAnalysis } from '../types';

interface SemanticEmbeddingViewProps {
  vectorData: SemanticVectorAnalysis;
}

export const SemanticEmbeddingView: React.FC<SemanticEmbeddingViewProps> = ({ vectorData }) => {
  const { cosineSimilarity, vectorDimension = 768, topOverlappingThemes = [] } = vectorData;

  const simPercent = Math.round(cosineSimilarity * 100);

  // Format themes for chart
  const chartData = topOverlappingThemes.map((theme) => ({
    name: theme.theme.length > 22 ? `${theme.theme.slice(0, 22)}...` : theme.theme,
    fullName: theme.theme,
    'Candidate Resume': theme.resumeWeight,
    'Job Requirement': theme.jobWeight,
  }));

  return (
    <div className="space-y-6">
      {/* Top Banner: Mathematical Cosine Similarity Score */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Binary className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Dense Vector Embedding Cosine Distance
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Semantic Similarity: {cosineSimilarity.toFixed(3)} ({simPercent}%)
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Unlike traditional keyword search that requires exact spelling, our AI embeddings project resume text and job requirements into a {vectorDimension}-dimensional geometric vector space to measure true conceptual alignment.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur border border-white/10 shrink-0">
            <div className="text-center">
              <span className="text-2xl font-black text-white">{simPercent}%</span>
              <p className="text-[10px] text-indigo-200 uppercase font-semibold">Similarity</p>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center">
              <span className="text-2xl font-black text-white">{vectorDimension}</span>
              <p className="text-[10px] text-indigo-200 uppercase font-semibold">Dimensions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Semantic Overlap Bar Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Semantic Theme Overlap Breakdown</span>
            </h4>
            <p className="text-xs text-slate-500">
              Comparing normalized vector weights between Candidate Profile and Target Role
            </p>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#64748b' }}
                interval={0}
                angle={-15}
                textAnchor="end"
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                unit="%"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '0.75rem',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="circle"
              />
              <Bar
                dataKey="Candidate Resume"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="Job Requirement"
                fill="#cbd5e1"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Side-by-Side: Exact Keyword vs Semantic Embedding comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Traditional Keyword Matcher (Rigid)
            </span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✗</span>
              <span>
                Fails to connect <strong>"Python development"</strong> with <strong>"Python programming"</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✗</span>
              <span>
                Misses <strong>"FastAPI microservices"</strong> when searching for <strong>"RESTful APIs"</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✗</span>
              <span>
                Penalizes candidate for synonyms, abbreviations, and phrasing variations.
              </span>
            </li>
          </ul>
        </div>

        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
              AI Semantic Embeddings (Context-Aware)
            </span>
          </div>
          <ul className="space-y-2 text-xs text-indigo-900/80">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>
                Understands contextual synonymy and related tech stacks automatically.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>
                Calculates mathematical cosine angle between conceptual representations.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>
                Identifies deep transferable competencies beyond exact keyword repetition.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
