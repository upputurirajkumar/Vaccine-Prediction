import { ModelBenchmark } from '../types/vaccine';

export const BENCHMARK_MODELS: ModelBenchmark[] = [
  {
    name: 'Tuned XGBoost',
    accuracy: 83.88,
    precision: 67.30,
    recall: 46.96,
    f1: 55.32,
    rocAuc: 83.51,
    isBest: true,
    notes: 'RandomizedSearchCV optimization: n_estimators=200, max_depth=5, lr=0.05, subsample=0.7, colsample=1.0. Selected as final production deployment model.',
  },
  {
    name: 'XGBoost (Baseline)',
    accuracy: 83.79,
    precision: 67.05,
    recall: 46.61,
    f1: 54.99,
    rocAuc: 83.57,
    notes: 'Default gradient boosted decision trees with logloss evaluation metric.',
  },
  {
    name: 'CatBoost',
    accuracy: 84.09,
    precision: 68.97,
    recall: 45.64,
    f1: 54.93,
    rocAuc: 83.47,
    notes: 'Highest raw accuracy, superior handling of categorical demographic variables.',
  },
  {
    name: 'LightGBM',
    accuracy: 83.73,
    precision: 66.79,
    recall: 46.61,
    f1: 54.90,
    rocAuc: 83.41,
    notes: 'Fast leaf-wise tree growth with highly competitive ROC-AUC.',
  },
  {
    name: 'Gradient Boosting',
    accuracy: 83.75,
    precision: 68.11,
    recall: 44.23,
    f1: 53.63,
    rocAuc: 83.08,
    notes: 'Scikit-learn GradientBoostingClassifier with sequential residual reduction.',
  },
  {
    name: 'AdaBoost',
    accuracy: 83.34,
    precision: 67.88,
    recall: 40.97,
    f1: 51.10,
    rocAuc: 82.68,
    notes: 'Adaptive boosting focused on misclassified borderline instances.',
  },
  {
    name: 'Random Forest',
    accuracy: 83.79,
    precision: 71.52,
    recall: 39.38,
    f1: 50.80,
    rocAuc: 82.66,
    notes: 'Highest precision (71.52%) among all evaluated tree ensembles.',
  },
  {
    name: 'Extra Trees',
    accuracy: 83.71,
    precision: 70.29,
    recall: 40.44,
    f1: 51.34,
    rocAuc: 82.51,
    notes: 'Extremely randomized trees with random cut-point selection.',
  },
  {
    name: 'Logistic Regression',
    accuracy: 83.68,
    precision: 68.71,
    recall: 42.56,
    f1: 52.56,
    rocAuc: 82.28,
    notes: 'L2-regularized linear baseline with scaled features and one-hot encoding.',
  },
  {
    name: 'Decision Tree',
    accuracy: 81.21,
    precision: 58.30,
    recall: 40.53,
    f1: 47.82,
    rocAuc: 77.77,
    notes: 'Single CART decision tree, prone to high variance and lower recall.',
  },
];

export const FEATURE_IMPORTANCES = [
  { feature: 'doctor_recc_h1n1', label: "Doctor's Recommendation (H1N1)", importance: 24.8, category: 'Clinical' },
  { feature: 'opinion_h1n1_risk', label: 'Perceived Illness Risk', importance: 17.6, category: 'Opinion' },
  { feature: 'opinion_h1n1_vacc_effective', label: 'Perceived Vaccine Efficacy', importance: 15.3, category: 'Opinion' },
  { feature: 'doctor_recc_seasonal', label: "Doctor's Recommendation (Seasonal)", importance: 11.2, category: 'Clinical' },
  { feature: 'health_insurance', label: 'Health Insurance Coverage', importance: 8.4, category: 'Access' },
  { feature: 'opinion_h1n1_sick_from_vacc', label: 'Worry of Getting Sick from Vaccine', importance: 6.9, category: 'Opinion' },
  { feature: 'health_worker', label: 'Healthcare Worker Status', importance: 5.5, category: 'Demographics' },
  { feature: 'chronic_med_condition', label: 'Chronic Medical Condition', importance: 4.1, category: 'Clinical' },
  { feature: 'age_group', label: 'Age Group (65+ Elderly vs 18-34 Youth)', importance: 3.2, category: 'Demographics' },
  { feature: 'h1n1_knowledge', label: 'Level of Disease Knowledge', importance: 1.8, category: 'Awareness' },
  { feature: 'child_under_6_months', label: 'Infant Child under 6 Months', importance: 1.2, category: 'Clinical' },
];

export const CONFUSION_MATRIX = {
  modelName: 'Tuned XGBoost (Test Split n=5,342)',
  total: 5342,
  trueNegative: 3948,
  falsePositive: 259,
  falseNegative: 602,
  truePositive: 533,
  accuracy: 83.88,
  precision: 67.30,
  recall: 46.96,
  specificity: 93.84,
  f1: 55.32,
  rocAuc: 83.51,
};

export const DATASET_STATS = {
  totalRespondents: 26707,
  totalFeatures: 36,
  targetVariables: 2,
  h1n1UptakeRate: 21.24, // 5,674 vaccinated out of 26,707
  seasonalUptakeRate: 46.56, // 12,435 vaccinated out of 26,707
  trainSplit: 21365, // 80%
  testSplit: 5342, // 20%
  crossValidationFolds: 5,
};
