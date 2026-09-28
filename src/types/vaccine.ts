export interface RespondentFeatures {
  // Opinions & Perceptions (1 to 5 scale)
  h1n1_concern: number; // 0: Not at all, 1: Not very, 2: Somewhat, 3: Very
  h1n1_knowledge: number; // 0: No knowledge, 1: A little, 2: A lot
  opinion_h1n1_vacc_effective: number; // 1: Not at all, 2: Not very, 3: Don't know, 4: Somewhat, 5: Very
  opinion_h1n1_risk: number; // 1: Very low, 2: Somewhat low, 3: Don't know, 4: Somewhat high, 5: Very high
  opinion_h1n1_sick_from_vacc: number; // 1: Not at all, 2: Not very, 3: Don't know, 4: Somewhat, 5: Very
  opinion_seas_vacc_effective: number; // 1 to 5
  opinion_seas_risk: number; // 1 to 5
  opinion_seas_sick_from_vacc: number; // 1 to 5

  // Medical & Clinical
  doctor_recc_h1n1: number; // 0: No, 1: Yes
  doctor_recc_seasonal: number; // 0: No, 1: Yes
  chronic_med_condition: number; // 0: No, 1: Yes
  child_under_6_months: number; // 0: No, 1: Yes
  health_worker: number; // 0: No, 1: Yes
  health_insurance: number; // 0: No, 1: Yes

  // Behavioral habits
  behavioral_antiviral_meds: number; // 0 or 1
  behavioral_avoidance: number; // 0 or 1
  behavioral_face_mask: number; // 0 or 1
  behavioral_wash_hands: number; // 0 or 1
  behavioral_large_gatherings: number; // 0 or 1
  behavioral_outside_home: number; // 0 or 1
  behavioral_touch_face: number; // 0 or 1

  // Demographics
  age_group: '18 - 34 Years' | '35 - 44 Years' | '45 - 54 Years' | '55 - 64 Years' | '65+ Years';
  education: '< 12 Years' | '12 Years' | 'Some College' | 'College Graduate';
  race: 'White' | 'Black' | 'Hispanic' | 'Other or Multiple';
  sex: 'Female' | 'Male';
  income_poverty: '<= $75,000, Above Poverty' | '> $75,000' | 'Below Poverty';
  marital_status: 'Married' | 'Not Married';
  rent_or_own: 'Own' | 'Rent';
  employment_status: 'Employed' | 'Not in Labor Force' | 'Unemployed';
  census_msa: 'MSA, Not Principle City' | 'MSA, Principle City' | 'Non-MSA';
  household_adults: number; // 0 to 3
  household_children: number; // 0 to 3
}

export interface PredictionResult {
  h1n1Probability: number; // 0 to 100
  h1n1Prediction: 0 | 1;
  seasonalProbability: number; // 0 to 100
  seasonalPrediction: 0 | 1;
  h1n1RiskLevel: 'High Hesitancy' | 'Moderate' | 'High Uptake';
  seasonalRiskLevel: 'High Hesitancy' | 'Moderate' | 'High Uptake';
  positiveDrivers: Array<{ name: string; impact: string; icon: string }>;
  negativeDrivers: Array<{ name: string; impact: string; icon: string }>;
  recommendations: Array<{ title: string; detail: string; category: 'clinical' | 'communication' | 'access' }>;
}

export interface ModelBenchmark {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  rocAuc: number;
  isBest?: boolean;
  notes: string;
}

export interface PersonaPreset {
  id: string;
  name: string;
  tagline: string;
  avatar: string;
  expectedOutcome: string;
  features: RespondentFeatures;
}
