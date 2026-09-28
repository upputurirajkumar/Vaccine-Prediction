export interface VaccineSurveyData {
  // Behavioral & Medical
  h1n1_concern: number; // 0: None, 1: Low, 2: Moderate, 3: High
  h1n1_knowledge: number; // 0: None, 1: Little, 2: Good
  behavioral_antiviral_meds: number; // 0 or 1
  behavioral_avoidance: number; // 0 or 1
  behavioral_face_mask: number; // 0 or 1
  behavioral_wash_hands: number; // 0 or 1
  behavioral_large_gatherings: number; // 0 or 1
  behavioral_outside_home: number; // 0 or 1
  behavioral_touch_face: number; // 0 or 1
  doctor_recc_h1n1: number; // 0 or 1
  doctor_recc_seasonal: number; // 0 or 1
  chronic_med_condition: number; // 0 or 1
  child_under_6_months: number; // 0 or 1
  health_worker: number; // 0 or 1
  health_insurance: number; // 0: No, 1: Yes

  // Opinions (1 to 5 scale: 1=Not at all, 5=Very)
  opinion_h1n1_vacc_effective: number; // 1 to 5
  opinion_h1n1_risk: number; // 1 to 5
  opinion_h1n1_sick_from_vacc: number; // 1 to 5
  opinion_seas_vacc_effective: number; // 1 to 5
  opinion_seas_risk: number; // 1 to 5
  opinion_seas_sick_from_vacc: number; // 1 to 5

  // Demographics
  age_group: '18 - 34 Years' | '35 - 44 Years' | '45 - 54 Years' | '55 - 64 Years' | '65+ Years';
  education: '< 12 Years' | '12 Years' | 'Some College' | 'College Graduate';
  race: 'White' | 'Black' | 'Hispanic' | 'Other or Multiple';
  sex: 'Female' | 'Male';
  income_poverty: 'Below Poverty' | '<= $75,000, Above Poverty' | '> $75,000';
  marital_status: 'Married' | 'Not Married';
  rent_or_own: 'Own' | 'Rent';
  employment_status: 'Employed' | 'Not in Labor Force' | 'Unemployed';
  household_adults: number; // 0, 1, 2, 3+
  household_children: number; // 0, 1, 2, 3+
}

export interface PredictionResult {
  h1n1Probability: number; // 0 to 100
  h1n1Prediction: 0 | 1;
  seasonalProbability: number; // 0 to 100
  seasonalPrediction: 0 | 1;
  h1n1RiskLevel: 'Low Uptake Likelihood' | 'Moderate / Uncertain' | 'High Uptake Likelihood';
  seasonalRiskLevel: 'Low Uptake Likelihood' | 'Moderate / Uncertain' | 'High Uptake Likelihood';
  positiveDrivers: { factor: string; impact: string; weight: number }[];
  negativeDrivers: { factor: string; impact: string; weight: number }[];
  recommendations: string[];
}

export interface ModelBenchmark {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  rocAuc: number;
  type: string;
  tuned?: boolean;
  notes: string;
}

export interface FeatureImportanceItem {
  feature: string;
  displayName: string;
  importance: number; // 0 to 1
  category: 'Healthcare' | 'Beliefs & Opinions' | 'Demographics' | 'Behavioral';
  description: string;
}

export interface PresetPersona {
  id: string;
  name: string;
  badge: string;
  description: string;
  data: VaccineSurveyData;
}
