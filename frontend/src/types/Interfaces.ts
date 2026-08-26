/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ResultMetricProps } from "../components/results/Result_Metric";

export interface ResumeData {
  filename: string;
  size: number;
  contentType: string;
  parsedText: string;
}

export interface JobDescriptionData {
  text: string;
}

export interface SkillGap {
  skill: string;
  severity: "High" | "Medium" | "Low";
  evidence: string;
}

export interface AnalysisResult {
  job_title: string;
  overall_rating: string;
  metrics: ResultMetricProps[];
  summary: string;
  strengths: string[];
  skill_gaps: SkillGap[];
  recommended_keywords: string[];
  improvement_suggestions: string[];
  suggested_resume_bullet: string;
}

export function getAnalysisResultFromResponse(response: any): AnalysisResult {
  return {
    job_title: response.job_title,
    overall_rating: response.overall_rating,
    metrics: response.metrics,
    summary: response.summary,
    strengths: response.strengths,
    skill_gaps: response.skill_gaps,
    recommended_keywords: response.recommended_keywords,
    improvement_suggestions: response.improvement_suggestions,
    suggested_resume_bullet: response.suggested_resume_bullet,
  };
}
