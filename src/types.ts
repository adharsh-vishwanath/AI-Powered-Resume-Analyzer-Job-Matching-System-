export interface SkillItem {
  name: string;
  category: 'language' | 'framework' | 'cloud_tool' | 'methodology' | 'soft_skill' | 'other';
  confidence?: number;
  matchedWith?: string; // in job description
  matchType?: 'exact' | 'semantic' | 'partial';
  explanation?: string;
}

export interface MissingSkillItem {
  name: string;
  category: 'language' | 'framework' | 'cloud_tool' | 'methodology' | 'soft_skill' | 'other';
  importance: 'critical' | 'important' | 'bonus';
  recommendation: string;
}

export interface ExperienceItem {
  title: string;
  company?: string;
  duration?: string;
  relevanceScore: number; // 0-100
  keyAchievements: string[];
  matchedKeywords: string[];
}

export interface EducationItem {
  degree: string;
  field?: string;
  institution?: string;
  graduationYear?: string;
  alignment: 'meets_requirement' | 'exceeds_requirement' | 'different_field' | 'not_specified';
}

export interface ATSAudit {
  atsScore: number; // 0-100
  rating: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
  bulletPointImpactScore: number; // 0-100
  formattingReadabilityScore: number; // 0-100
  keywordDensityScore: number; // 0-100
  strengths: string[];
  warnings: string[];
  quantifiableMetricsFound: number;
}

export interface ResponsibleAICheck {
  fairnessScore: number; // 0-100
  detectedBiasesOrProxies: Array<{
    type: 'age' | 'gender' | 'location' | 'institution_prestige' | 'unconscious_bias';
    textFound: string;
    suggestion: string;
  }>;
  inclusiveLanguageRating: 'Inclusive' | 'Neutral' | 'Needs Attention';
  privacySummary: {
    piiDetected: string[];
    anonymizedSummary: string;
  };
}

export interface ImprovementSuggestion {
  originalBullet?: string;
  improvedBullet?: string;
  reason: string;
  targetSkill: string;
}

export interface SemanticVectorAnalysis {
  cosineSimilarity: number; // 0.0 - 1.0 (e.g. 0.86)
  vectorDimension?: number;
  topOverlappingThemes: Array<{
    theme: string;
    resumeWeight: number; // 0-100
    jobWeight: number; // 0-100
  }>;
}

export interface AnalysisResult {
  candidateName: string;
  targetRole: string;
  overallMatchScore: number; // 0-100
  scores: {
    overall: number;
    semanticSimilarity: number;
    hardSkills: number;
    experience: number;
    education: number;
    atsReadiness: number;
  };
  summaryVerdict: string;
  matchingSkills: SkillItem[];
  missingSkills: MissingSkillItem[];
  additionalCandidateSkills: string[];
  experienceAnalysis: ExperienceItem[];
  educationAnalysis: EducationItem[];
  atsAudit: ATSAudit;
  responsibleAI: ResponsibleAICheck;
  improvements: ImprovementSuggestion[];
  semanticVectorAnalysis: SemanticVectorAnalysis;
  analyzedAt: string;
}

export interface PresetJob {
  id: string;
  title: string;
  company: string;
  level: string;
  description: string;
}

export interface PresetResume {
  id: string;
  name: string;
  title: string;
  filename: string;
  content: string;
}
