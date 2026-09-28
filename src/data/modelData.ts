import { ModelBenchmark, FeatureImportanceItem, PresetPersona, VaccineSurveyData } from '../types';

export const DEFAULT_SURVEY_DATA: VaccineSurveyData = {
  h1n1_concern: 1,
  h1n1_knowledge: 1,
  behavioral_antiviral_meds: 0,
  behavioral_avoidance: 1,
  behavioral_face_mask: 0,
  behavioral_wash_hands: 1,
  behavioral_large_gatherings: 0,
  behavioral_outside_home: 0,
  behavioral_touch_face: 1,
  doctor_recc_h1n1: 0,
  doctor_recc_seasonal: 0,
  chronic_med_condition: 0,
  child_under_6_months: 0,
  health_worker: 0,
  health_insurance: 1,
  opinion_h1n1_vacc_effective: 3,
  opinion_h1n1_risk: 2,
  opinion_h1n1_sick_from_vacc: 2,
  opinion_seas_vacc_effective: 4,
  opinion_seas_risk: 2,
  opinion_seas_sick_from_vacc: 2,
  age_group: '45 - 54 Years',
  education: 'Some College',
  race: 'White',
  sex: 'Female',
  income_poverty: '<= $75,000, Above Poverty',
  marital_status: 'Married',
  rent_or_own: 'Own',
  employment_status: 'Employed',
  household_adults: 1,
  household_children: 0,
};

export const PRESET_PERSONAS: PresetPersona[] = [
  {
    id: 'healthcare_worker',
    name: 'Clinical Health Worker',
    badge: 'High Uptake Probability',
    description: 'Direct patient contact, high medical literacy, doctor recommended, high perceived risk and strong belief in vaccine efficacy.',
    data: {
      ...DEFAULT_SURVEY_DATA,
      h1n1_concern: 2,
      h1n1_knowledge: 2,
      health_worker: 1,
      doctor_recc_h1n1: 1,
      doctor_recc_seasonal: 1,
      health_insurance: 1,
      opinion_h1n1_vacc_effective: 5,
      opinion_h1n1_risk: 4,
      opinion_h1n1_sick_from_vacc: 1,
      opinion_seas_vacc_effective: 5,
      opinion_seas_risk: 4,
      opinion_seas_sick_from_vacc: 1,
      education: 'College Graduate',
      income_poverty: '> $75,000',
    }
  },
  {
    id: 'hesitant_young_adult',
    name: 'Vaccine-Hesitant Young Adult',
    badge: 'Low Uptake Probability',
    description: 'Under 35, uninsured, no doctor recommendation, feels not at risk, and fears side-effects.',
    data: {
      ...DEFAULT_SURVEY_DATA,
      age_group: '18 - 34 Years',
      h1n1_concern: 0,
      h1n1_knowledge: 0,
      doctor_recc_h1n1: 0,
      doctor_recc_seasonal: 0,
      health_insurance: 0,
      opinion_h1n1_vacc_effective: 2,
      opinion_h1n1_risk: 1,
      opinion_h1n1_sick_from_vacc: 4,
      opinion_seas_vacc_effective: 2,
      opinion_seas_risk: 1,
      opinion_seas_sick_from_vacc: 4,
      education: '12 Years',
      income_poverty: 'Below Poverty',
      rent_or_own: 'Rent',
      marital_status: 'Not Married',
    }
  },
  {
    id: 'senior_chronic',
    name: 'Senior with Chronic Condition',
    badge: 'Seasonal Prioritizer',
    description: 'Age 65+, chronic illness, seasonal recommendation received from primary physician.',
    data: {
      ...DEFAULT_SURVEY_DATA,
      age_group: '65+ Years',
      chronic_med_condition: 1,
      doctor_recc_h1n1: 0,
      doctor_recc_seasonal: 1,
      health_insurance: 1,
      opinion_h1n1_vacc_effective: 3,
      opinion_h1n1_risk: 2,
      opinion_h1n1_sick_from_vacc: 2,
      opinion_seas_vacc_effective: 5,
      opinion_seas_risk: 4,
      opinion_seas_sick_from_vacc: 1,
      employment_status: 'Not in Labor Force',
      household_adults: 1,
      household_children: 0,
    }
  },
  {
    id: 'infant_caregiver',
    name: 'Parent with Infant Under 6 Mo',
    badge: 'Maternal & Cocooning Priority',
    description: 'Caring for a newborn too young for vaccination; doctor recommended to protect child.',
    data: {
      ...DEFAULT_SURVEY_DATA,
      age_group: '18 - 34 Years',
      child_under_6_months: 1,
      h1n1_concern: 3,
      h1n1_knowledge: 2,
      doctor_recc_h1n1: 1,
      doctor_recc_seasonal: 1,
      opinion_h1n1_vacc_effective: 4,
      opinion_h1n1_risk: 4,
      opinion_h1n1_sick_from_vacc: 2,
      opinion_seas_vacc_effective: 4,
      opinion_seas_risk: 3,
      opinion_seas_sick_from_vacc: 2,
      household_children: 2,
    }
  },
  {
    id: 'skeptical_working_adult',
    name: 'Safety-Concerned Worker',
    badge: 'Misinformation Risk',
    description: 'Worries about severe adverse events, doubts vaccine testing timeline, high risk of rejection without counseling.',
    data: {
      ...DEFAULT_SURVEY_DATA,
      h1n1_concern: 2,
      h1n1_knowledge: 1,
      doctor_recc_h1n1: 0,
      doctor_recc_seasonal: 0,
      opinion_h1n1_vacc_effective: 2,
      opinion_h1n1_risk: 2,
      opinion_h1n1_sick_from_vacc: 5,
      opinion_seas_vacc_effective: 3,
      opinion_seas_risk: 2,
      opinion_seas_sick_from_vacc: 4,
      behavioral_wash_hands: 1,
      behavioral_avoidance: 1,
    }
  },
  {
    id: 'average_respondent',
    name: 'Median Survey Respondent',
    badge: 'Baseline Population',
    description: 'Represents the modal characteristics across all 26,707 surveyed participants.',
    data: DEFAULT_SURVEY_DATA
  }
];

export const MODEL_BENCHMARKS: ModelBenchmark[] = [
  {
    name: 'Tuned XGBoost',
    type: 'Ensemble Gradient Boosting',
    accuracy: 83.88,
    precision: 0.6730,
    recall: 0.4696,
    f1: 0.5532,
    rocAuc: 0.8351,
    tuned: true,
    notes: 'Selected as the top production model after RandomizedSearchCV hyperparameter optimization (n_estimators=200, max_depth=5, lr=0.05).'
  },
  {
    name: 'XGBoost (Baseline)',
    type: 'Ensemble Gradient Boosting',
    accuracy: 83.79,
    precision: 0.6705,
    recall: 0.4661,
    f1: 0.5499,
    rocAuc: 0.8357,
    tuned: false,
    notes: 'Highest default ROC-AUC score (0.8357) among all baseline classifiers prior to tuning.'
  },
  {
    name: 'CatBoost',
    type: 'Gradient Boosting (Categorical)',
    accuracy: 84.09,
    precision: 0.6897,
    recall: 0.4564,
    f1: 0.5493,
    rocAuc: 0.8347,
    tuned: false,
    notes: 'Highest test accuracy (84.09%) with strong handling of categorical demographic variables.'
  },
  {
    name: 'LightGBM',
    type: 'Histogram Gradient Boosting',
    accuracy: 83.73,
    precision: 0.6679,
    recall: 0.4661,
    f1: 0.5490,
    rocAuc: 0.8341,
    tuned: false,
    notes: 'Extremely fast training speed with competitive AUC (0.8341).'
  },
  {
    name: 'Gradient Boosting',
    type: 'Sequential Tree Ensemble',
    accuracy: 83.75,
    precision: 0.6811,
    recall: 0.4423,
    f1: 0.5363,
    rocAuc: 0.8308,
    tuned: false,
    notes: 'Solid baseline performance with balanced precision and accuracy.'
  },
  {
    name: 'AdaBoost',
    type: 'Adaptive Boosting',
    accuracy: 83.34,
    precision: 0.6788,
    recall: 0.4097,
    f1: 0.5110,
    rocAuc: 0.8268,
    tuned: false,
    notes: 'Good precision but lower recall on the minority vaccinated class.'
  },
  {
    name: 'Random Forest',
    type: 'Bagged Decision Trees',
    accuracy: 83.79,
    precision: 0.7152,
    recall: 0.3938,
    f1: 0.5080,
    rocAuc: 0.8266,
    tuned: false,
    notes: 'Highest precision (71.52%) of all models, but lowest false alarm rate at the cost of recall.'
  },
  {
    name: 'Extra Trees',
    type: 'Extremely Randomized Trees',
    accuracy: 83.71,
    precision: 0.7029,
    recall: 0.4044,
    f1: 0.5134,
    rocAuc: 0.8251,
    tuned: false,
    notes: 'High precision (70.29%) with lower variance across split folds.'
  },
  {
    name: 'Logistic Regression',
    type: 'Generalized Linear Model',
    accuracy: 83.68,
    precision: 0.6871,
    recall: 0.4256,
    f1: 0.5256,
    rocAuc: 0.8228,
    tuned: false,
    notes: 'Strong interpretable baseline with coefficients directly indicating log-odds.'
  },
  {
    name: 'Decision Tree',
    type: 'Single CART Classifier',
    accuracy: 81.21,
    precision: 0.5830,
    recall: 0.4053,
    f1: 0.4782,
    rocAuc: 0.7777,
    tuned: false,
    notes: 'Prone to overfitting; lower ROC-AUC (0.7777) compared to boosting and bagging ensembles.'
  }
];

export const BEST_MODEL_HYPERPARAMETERS = {
  model: 'Tuned XGBoost (XGBClassifier)',
  objective: 'binary:logistic',
  eval_metric: 'logloss',
  n_estimators: 200,
  max_depth: 5,
  learning_rate: 0.05,
  subsample: 0.7,
  colsample_bytree: 1.0,
  random_state: 42,
  cv_folds: 5,
  search_iterations: 20
};

export const CONFUSION_MATRIX = {
  modelName: 'Tuned XGBoost',
  totalTestSamples: 5342,
  trueNegative: 3948,
  falsePositive: 259,
  falseNegative: 602,
  truePositive: 533,
  support0: 4207,
  support1: 1135
};

export const TOP_FEATURE_IMPORTANCE: FeatureImportanceItem[] = [
  {
    feature: 'doctor_recc_h1n1',
    displayName: 'Doctor Recommendation (H1N1)',
    importance: 0.285,
    category: 'Healthcare',
    description: 'Whether a physician explicitly recommended receiving the H1N1 flu vaccine. By far the strongest single behavioral catalyst.'
  },
  {
    feature: 'opinion_h1n1_risk',
    displayName: 'Perceived Infection Risk (H1N1)',
    importance: 0.178,
    category: 'Beliefs & Opinions',
    description: 'Personal estimate of how likely the respondent is to become ill without vaccination (scale 1 to 5).'
  },
  {
    feature: 'opinion_h1n1_vacc_effective',
    displayName: 'Vaccine Efficacy Belief',
    importance: 0.142,
    category: 'Beliefs & Opinions',
    description: 'Belief that the H1N1 vaccine protects against contracting influenza (scale 1 to 5).'
  },
  {
    feature: 'health_insurance',
    displayName: 'Health Insurance Coverage',
    importance: 0.089,
    category: 'Healthcare',
    description: 'Having healthcare coverage removes co-pay and financial friction for clinic visits.'
  },
  {
    feature: 'opinion_seas_risk',
    displayName: 'Perceived Seasonal Flu Risk',
    importance: 0.065,
    category: 'Beliefs & Opinions',
    description: 'Cross-perception of vulnerability to general influenza strains.'
  },
  {
    feature: 'chronic_med_condition',
    displayName: 'Chronic Medical Condition',
    importance: 0.058,
    category: 'Healthcare',
    description: 'Conditions like asthma, diabetes, heart disease increase clinical urgency.'
  },
  {
    feature: 'health_worker',
    displayName: 'Healthcare Worker Status',
    importance: 0.052,
    category: 'Healthcare',
    description: 'Medical professionals have mandate requirements and daily occupational exposure.'
  },
  {
    feature: 'opinion_h1n1_sick_from_vacc',
    displayName: 'Fear of Vaccine Sickness',
    importance: 0.045,
    category: 'Beliefs & Opinions',
    description: 'Worry about contracting illness or adverse side-effects from the shot (negative driver).'
  },
  {
    feature: 'age_group',
    displayName: 'Age Bracket (Seniority)',
    importance: 0.038,
    category: 'Demographics',
    description: 'Older age cohorts exhibit higher healthcare compliance, especially 65+.'
  },
  {
    feature: 'doctor_recc_seasonal',
    displayName: 'Doctor Recommendation (Seasonal)',
    importance: 0.026,
    category: 'Healthcare',
    description: 'Doctor recommendation for standard seasonal flu shot.'
  },
  {
    feature: 'education',
    displayName: 'Education Attainment Level',
    importance: 0.012,
    category: 'Demographics',
    description: 'Higher education correlates with higher scientific consensus acceptance.'
  },
  {
    feature: 'behavioral_wash_hands',
    displayName: 'Frequent Hand Washing Habit',
    importance: 0.010,
    category: 'Behavioral',
    description: 'General proactive hygiene and self-protection behaviors.'
  }
];

export const DATASET_SUMMARY = {
  totalRecords: 26707,
  totalFeatures: 36,
  targetVariables: ['h1n1_vaccine', 'seasonal_vaccine'],
  h1n1VaccinatedRate: '21.2% (5,674 recipients)',
  h1n1UnvaccinatedRate: '78.8% (21,033 non-recipients)',
  seasonalVaccinatedRate: '46.6% (12,435 recipients)',
  seasonalUnvaccinatedRate: '53.4% (14,272 non-recipients)',
  trainSplitSize: '80% (21,365 records)',
  testSplitSize: '20% (5,342 records)',
  stratification: 'Stratified train_test_split on h1n1_vaccine target',
  missingValueImputation: 'SimpleImputer: Median for numerical/ordinal features, Mode/Frequent for categorical features',
  encodingMethod: 'OneHotEncoder and LabelEncoder for categorical variables, StandardScaler for continuous'
};
