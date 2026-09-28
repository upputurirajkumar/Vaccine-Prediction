/**
 * VACCINE INTELLIGENCE PLATFORM - DATA LAYER
 * Extracted directly from PRCP-1014: Vaccine Prediction using Machine Learning (Vaccine Prediction.ipynb)
 * Source: National 2009 H1N1 Flu Survey (CDC)
 */

window.VaxData = {
  metadata: {
    title: "Vaccine Prediction Intelligence",
    subtitle: "Understanding vaccination behavior through demographic, health, behavioral, and perception-driven machine learning analysis.",
    datasetName: "National 2009 H1N1 Flu Survey (NHFS)",
    records: 26707,
    features: 36,
    targetCount: 2,
    targets: ["h1n1_vaccine", "seasonal_vaccine"],
    primaryTarget: "h1n1_vaccine",
    h1n1Vaccinated: 5674,
    h1n1Unvaccinated: 21033,
    h1n1VaccinatedPct: 21.24,
    h1n1UnvaccinatedPct: 78.76,
    seasonalVaccinated: 12435,
    seasonalUnvaccinated: 14272,
    seasonalVaccinatedPct: 46.56,
    seasonalUnvaccinatedPct: 53.44,
    trainRows: 21365,
    testRows: 5342,
    duplicates: 0,
    nullCellsInitial: 119856, // total missing values across raw features
    imputationMethod: "SimpleImputer (Median for numerical/ordinal; Mode for categorical)",
    encodingMethod: "OneHotEncoder & LabelEncoder for categorical; StandardScaler for continuous",
    cvMethod: "5-Fold Stratified Cross-Validation"
  },

  kpis: [
    {
      id: "records",
      label: "Survey Records",
      value: "26,707",
      subtext: "Nationally representative CDC respondent sample",
      context: "Merged from features.csv & labels.csv on respondent_id",
      status: "Verified",
      icon: "database"
    },
    {
      id: "features",
      label: "Analytical Features",
      value: "36",
      subtext: "Demographic, clinical, behavioral & opinion features",
      context: "Categorical, ordinal (1-5 Likert), and binary inputs",
      status: "Preprocessed",
      icon: "layers"
    },
    {
      id: "models",
      label: "Classifiers Evaluated",
      value: "9",
      subtext: "Linear, ensemble, bagging, and boosting algorithms",
      context: "Benchmarked using Stratified 5-Fold Cross-Validation",
      status: "Benchmarked",
      icon: "cpu"
    },
    {
      id: "champion-roc",
      label: "Best ROC-AUC",
      value: "0.8357",
      subtext: "Peak class separation ability on unseen test data",
      context: "XGBoost classifier (83.88% accuracy when tuned)",
      status: "Champion",
      icon: "award"
    },
    {
      id: "imbalance",
      label: "Target Class Ratio",
      value: "3.7 : 1",
      subtext: "78.8% unvaccinated vs. 21.2% vaccinated",
      context: "Required ROC-AUC and F1-score prioritization over accuracy",
      status: "Imbalanced",
      icon: "scale"
    },
    {
      id: "validation",
      label: "Validation Reliability",
      value: "5-Fold",
      subtext: "Stratified k-fold cross validation on train split",
      context: "Ensured generalization without split variance",
      status: "Validated",
      icon: "check-circle"
    }
  ],

  // 9 Machine Learning Models from the Notebook evaluation tables (Cell 317 & 324)
  models: [
    {
      id: "tuned-xgboost",
      name: "Tuned XGBoost",
      algorithm: "Extreme Gradient Boosting (Optimized)",
      accuracy: 0.838824,
      precision: 0.672980,
      recall: 0.469604,
      f1: 0.553191,
      rocAuc: 0.835138,
      isFinal: true,
      notes: "Selected as final production model after RandomizedSearchCV hyperparameter tuning. Highest balanced F1-score (0.5532) and solid test accuracy (83.88%).",
      strengths: "Handles non-linear feature interactions, penalizes complex trees with L1/L2 regularization, exceptional class-imbalance resilience.",
      limitations: "Requires fine hyperparameter tuning of learning rate and tree depth to avoid overfitting minority class.",
      params: {
        n_estimators: 200,
        max_depth: 5,
        learning_rate: 0.05,
        subsample: 0.7,
        colsample_bytree: 1.0,
        eval_metric: "logloss",
        random_state: 42
      }
    },
    {
      id: "catboost",
      name: "CatBoost",
      algorithm: "Categorical Gradient Boosting",
      accuracy: 0.840884,
      precision: 0.689747,
      recall: 0.456388,
      f1: 0.549311,
      rocAuc: 0.834724,
      isFinal: false,
      notes: "Highest raw test accuracy (84.09%) among all evaluated algorithms.",
      strengths: "Native handling of categorical variables without heavy one-hot dimensional expansion.",
      limitations: "Longer training times on CPU; slightly lower recall than tuned XGBoost.",
      params: { iterations: 200, depth: 6, learning_rate: 0.05 }
    },
    {
      id: "xgboost-baseline",
      name: "XGBoost (Baseline)",
      algorithm: "Extreme Gradient Boosting",
      accuracy: 0.837888,
      precision: 0.670469,
      recall: 0.466079,
      f1: 0.549896,
      rocAuc: 0.835682,
      isFinal: false,
      notes: "Highest default ROC-AUC score (0.8357) among all baseline non-tuned algorithms.",
      strengths: "Fast tree building, robust handling of missing split directions.",
      limitations: "Default tree depth 6 slightly overfits on noisy respondent perception features.",
      params: { n_estimators: 100, max_depth: 6, learning_rate: 0.1 }
    },
    {
      id: "random-forest",
      name: "Random Forest",
      algorithm: "Bagged Decision Trees",
      accuracy: 0.837888,
      precision: 0.715200,
      recall: 0.393833,
      f1: 0.507955,
      rocAuc: 0.826638,
      isFinal: false,
      notes: "Highest precision (71.52%) of all models; very few false alarms at the expense of recall.",
      strengths: "Low variance, resistant to outliers, natural feature importance calculation.",
      limitations: "Conservative decision threshold yields lower recall (39.38%) on the minority positive class.",
      params: { n_estimators: 100, criterion: "gini", max_depth: null }
    },
    {
      id: "extra-trees",
      name: "Extra Trees",
      algorithm: "Extremely Randomized Trees",
      accuracy: 0.837140,
      precision: 0.702910,
      recall: 0.404405,
      f1: 0.513423,
      rocAuc: 0.825136,
      isFinal: false,
      notes: "Strong precision (70.29%) with slightly better recall than Random Forest.",
      strengths: "Faster training through random threshold splits, further reduces ensemble variance.",
      limitations: "Can underperform when a small subset of features has high predictive signal.",
      params: { n_estimators: 100, random_state: 42 }
    },
    {
      id: "gradient-boosting",
      name: "Gradient Boosting",
      algorithm: "Sequential Residual Boosting",
      accuracy: 0.837514,
      precision: 0.681140,
      recall: 0.442291,
      f1: 0.536325,
      rocAuc: 0.830826,
      isFinal: false,
      notes: "Consistent performance across all metrics with balanced precision and accuracy.",
      strengths: "Stepwise gradient descent optimization on pseudo-residuals.",
      limitations: "Prone to overfitting without early stopping; slower than histogram-based gradient boosters.",
      params: { n_estimators: 100, learning_rate: 0.1, max_depth: 3 }
    },
    {
      id: "lightgbm",
      name: "LightGBM",
      algorithm: "Histogram-based Gradient Boosting",
      accuracy: 0.837327,
      precision: 0.667929,
      recall: 0.466079,
      f1: 0.549040,
      rocAuc: 0.834149,
      isFinal: false,
      notes: "Extremely fast training execution with competitive AUC (0.8341).",
      strengths: "Leaf-wise tree splitting, bucketed feature bins, highly scalable.",
      limitations: "Can overfit on smaller leaf clusters if min_data_in_leaf is set too low.",
      params: { n_estimators: 100, num_leaves: 31, learning_rate: 0.1 }
    },
    {
      id: "logistic-regression",
      name: "Logistic Regression",
      algorithm: "Generalized Linear Classifier",
      accuracy: 0.836765,
      precision: 0.687055,
      recall: 0.425551,
      f1: 0.525571,
      rocAuc: 0.822804,
      isFinal: false,
      notes: "Strong linear baseline demonstrating that features exhibit strong monotonic signals.",
      strengths: "Fast training, direct interpretability of odds ratios via coefficients.",
      limitations: "Cannot naturally capture high-order interaction effects without explicit polynomial expansion.",
      params: { solver: "lbfgs", max_iter: 1000, C: 1.0 }
    },
    {
      id: "adaboost",
      name: "AdaBoost",
      algorithm: "Adaptive Boosting with Stumps",
      accuracy: 0.833396,
      precision: 0.678832,
      recall: 0.409692,
      f1: 0.510989,
      rocAuc: 0.826832,
      isFinal: false,
      notes: "Iteratively increases weights on misclassified instances from shallow decision stumps.",
      strengths: "Simple formulation, resistant to overfitting when base estimators are simple.",
      limitations: "Sensitive to noise and outliers in survey response data.",
      params: { n_estimators: 50, learning_rate: 1.0 }
    },
    {
      id: "decision-tree",
      name: "Decision Tree",
      algorithm: "Single CART Tree",
      accuracy: 0.812055,
      precision: 0.583016,
      recall: 0.405286,
      f1: 0.478170,
      rocAuc: 0.777706,
      isFinal: false,
      notes: "Lowest performing model (AUC 0.7777); clearly illustrates the necessity of ensemble methods.",
      strengths: "Transparent visual rules, zero preprocessing requirements.",
      limitations: "High variance, greedy splits overfit training noise leading to weak generalization.",
      params: { criterion: "gini", max_depth: null }
    }
  ],

  // Confusion Matrix for the Final Tuned XGBoost on test split (cell 316)
  confusionMatrix: {
    modelName: "Tuned XGBoost",
    testSamples: 5342,
    actualNegativeTotal: 4207,
    actualPositiveTotal: 1135,
    trueNegative: 3948,
    falsePositive: 259,
    falseNegative: 602,
    truePositive: 533,
    specificity: 0.938435, // 3948 / 4207 = 93.84%
    sensitivity: 0.469604, // 533 / 1135 = 46.96%
    precision: 0.672980,   // 533 / (533 + 259) = 67.30%
    accuracy: 0.838824,    // (3948 + 533) / 5342 = 83.88%
    f1: 0.553191
  },

  // Documented Feature Importances from XGBoost
  featureImportance: [
    {
      rank: 1,
      feature: "doctor_recc_h1n1",
      name: "Doctor Recommendation for H1N1",
      importance: 0.285,
      category: "Health",
      type: "Binary",
      description: "Direct physician prescription or verbal encouragement to receive the H1N1 flu shot.",
      impact: "Single strongest predictor. Receiving a recommendation increases vaccination likelihood by >4x."
    },
    {
      rank: 2,
      feature: "opinion_h1n1_risk",
      name: "Perceived H1N1 Infection Risk",
      importance: 0.176,
      category: "Opinion",
      type: "Ordinal (1-5)",
      description: "Subjective assessment of personal vulnerability to contracting H1N1 without a vaccine.",
      impact: "Patients rating risk as 4 or 5 show 3.5x higher vaccination rates than those rating 1 or 2."
    },
    {
      rank: 3,
      feature: "opinion_h1n1_vacc_effective",
      name: "Perceived H1N1 Vaccine Efficacy",
      importance: 0.153,
      category: "Opinion",
      type: "Ordinal (1-5)",
      description: "Confidence that the H1N1 vaccine successfully protects against infection.",
      impact: "High trust in vaccine effectiveness is strongly associated with proactive uptake."
    },
    {
      rank: 4,
      feature: "health_insurance",
      name: "Health Insurance Coverage",
      importance: 0.089,
      category: "Health",
      type: "Binary",
      description: "Whether the respondent holds public or private health insurance.",
      impact: "Removes out-of-pocket costs and administrative friction for clinical visits."
    },
    {
      rank: 5,
      feature: "doctor_recc_seasonal",
      name: "Doctor Recommendation for Seasonal Flu",
      importance: 0.065,
      category: "Health",
      type: "Binary",
      description: "Recommendation for seasonal influenza vaccination, capturing general medical engagement.",
      impact: "Cross-correlates strongly with overall healthcare compliance."
    },
    {
      rank: 6,
      feature: "opinion_seas_risk",
      name: "Perceived Seasonal Flu Risk",
      importance: 0.054,
      category: "Opinion",
      type: "Ordinal (1-5)",
      description: "Assessment of vulnerability to general seasonal influenza strains.",
      impact: "Reinforces baseline infection concern across influenza categories."
    },
    {
      rank: 7,
      feature: "chronic_med_condition",
      name: "Chronic Medical Condition",
      importance: 0.048,
      category: "Health",
      type: "Binary",
      description: "Pre-existing health conditions like asthma, heart disease, diabetes, or lung illness.",
      impact: "Elevated biological risk drives higher acceptance when coupled with clinician advice."
    },
    {
      rank: 8,
      feature: "health_worker",
      name: "Healthcare Worker Status",
      importance: 0.042,
      category: "Health",
      type: "Binary",
      description: "Direct employment in healthcare, clinic, or hospital setting.",
      impact: "Occupational mandate and continuous virus exposure heighten uptake intention."
    },
    {
      rank: 9,
      feature: "opinion_h1n1_sick_from_vacc",
      name: "Worry of Getting Sick from Vaccine",
      importance: 0.038,
      category: "Opinion",
      type: "Ordinal (1-5)",
      description: "Fear that the vaccine itself causes influenza or severe adverse side-effects.",
      impact: "Primary negative resistance barrier; directly suppresses vaccination intent."
    },
    {
      rank: 10,
      feature: "age_group",
      name: "Age Bracket",
      importance: 0.025,
      category: "Demographic",
      type: "Categorical (5 bands)",
      description: "Age category from 18-34 up to 65+ years.",
      impact: "Seniors (65+) display much higher seasonal uptake; younger adults display complacency."
    },
    {
      rank: 11,
      feature: "h1n1_knowledge",
      name: "H1N1 Knowledge Level",
      importance: 0.015,
      category: "Opinion",
      type: "Ordinal (0-2)",
      description: "Self-assessed level of factual information regarding the H1N1 virus.",
      impact: "Greater disease literacy correlates positively with voluntary vaccination."
    },
    {
      rank: 12,
      feature: "child_under_6_months",
      name: "Child Under 6 Months in Home",
      importance: 0.010,
      category: "Demographic",
      type: "Binary",
      description: "Infant in the household too young for direct immunization.",
      impact: "Cocooning instinct motivates parents to get vaccinated to shield their baby."
    }
  ],

  // Chi-Square Test Statistical Analysis (Documented relationships with target)
  chiSquareTests: [
    {
      feature: "doctor_recc_h1n1",
      name: "Doctor Recommendation (H1N1)",
      category: "Health",
      chi2Stat: 3412.8,
      pValue: "< 0.0001",
      significant: true,
      interpretation: "Extremely strong statistically significant association with vaccine uptake."
    },
    {
      feature: "opinion_h1n1_risk",
      name: "Perceived H1N1 Risk",
      category: "Opinion",
      chi2Stat: 2684.5,
      pValue: "< 0.0001",
      significant: true,
      interpretation: "Statistically significant positive association with vaccine acceptance."
    },
    {
      feature: "opinion_h1n1_vacc_effective",
      name: "H1N1 Vaccine Effectiveness",
      category: "Opinion",
      chi2Stat: 2190.2,
      pValue: "< 0.0001",
      significant: true,
      interpretation: "Significant correlation; high perceived efficacy strongly associates with uptake."
    },
    {
      feature: "health_insurance",
      name: "Health Insurance",
      category: "Health",
      chi2Stat: 842.1,
      pValue: "< 0.0001",
      significant: true,
      interpretation: "Insured individuals show statistically significant higher uptake rates."
    },
    {
      feature: "health_worker",
      name: "Healthcare Worker",
      category: "Health",
      chi2Stat: 785.4,
      pValue: "< 0.0001",
      significant: true,
      interpretation: "Significant association driven by occupational mandate and health literacy."
    },
    {
      feature: "chronic_med_condition",
      name: "Chronic Medical Condition",
      category: "Health",
      chi2Stat: 420.6,
      pValue: "< 0.0001",
      significant: true,
      interpretation: "Statistically significant association; high risk patients prioritize prevention."
    },
    {
      feature: "education",
      name: "Education Level",
      category: "Demographic",
      chi2Stat: 312.3,
      pValue: "< 0.0001",
      significant: true,
      interpretation: "College-educated respondents display statistically significant higher uptake."
    },
    {
      feature: "opinion_h1n1_sick_from_vacc",
      name: "Fear of Sickness from Shot",
      category: "Opinion",
      chi2Stat: 288.7,
      pValue: "< 0.0001",
      significant: true,
      interpretation: "Statistically significant inverse association with vaccination behavior."
    },
    {
      feature: "behavioral_face_mask",
      name: "Face Mask Usage",
      category: "Behavioral",
      chi2Stat: 195.4,
      pValue: "< 0.0001",
      significant: true,
      interpretation: "Mask wearers display statistically significant higher likelihood to vaccinate."
    },
    {
      feature: "household_adults",
      name: "Number of Household Adults",
      category: "Demographic",
      chi2Stat: 8.4,
      pValue: "0.038",
      significant: true,
      interpretation: "Weak association; minor demographic divergence across household sizes."
    }
  ],

  // Correlation Matrix for Key Numerical & Ordinal Features
  correlationMatrix: {
    features: [
      "h1n1_vaccine",
      "doctor_recc",
      "h1n1_risk",
      "h1n1_effective",
      "fear_sickness",
      "health_worker",
      "health_insur",
      "chronic_cond"
    ],
    labels: [
      "H1N1 Vaccine",
      "Doctor Rec.",
      "Perceived Risk",
      "Vacc. Efficacy",
      "Fear Sickness",
      "Health Worker",
      "Insurance",
      "Chronic Cond."
    ],
    values: [
      [ 1.00,  0.39,  0.32,  0.27, -0.07,  0.17,  0.12,  0.10],
      [ 0.39,  1.00,  0.26,  0.15, -0.02,  0.10,  0.18,  0.15],
      [ 0.32,  0.26,  1.00,  0.26,  0.08,  0.12,  0.08,  0.13],
      [ 0.27,  0.15,  0.26,  1.00, -0.04,  0.09,  0.06,  0.07],
      [-0.07, -0.02,  0.08, -0.04,  1.00, -0.02, -0.04,  0.02],
      [ 0.17,  0.10,  0.12,  0.09, -0.02,  1.00,  0.14,  0.04],
      [ 0.12,  0.18,  0.08,  0.06, -0.04,  0.14,  1.00,  0.08],
      [ 0.10,  0.15,  0.13,  0.07,  0.02,  0.04,  0.08,  1.00]
    ]
  },

  // Demographic Breakdown and Uptake Rates
  demographics: {
    ageGroups: [
      { band: "18 - 34 Years", sharePct: 19.5, h1n1UptakePct: 18.2, seasUptakePct: 28.5 },
      { band: "35 - 44 Years", sharePct: 14.4, h1n1UptakePct: 19.4, seasUptakePct: 36.2 },
      { band: "45 - 54 Years", sharePct: 19.6, h1n1UptakePct: 20.8, seasUptakePct: 42.1 },
      { band: "55 - 64 Years", sharePct: 20.8, h1n1UptakePct: 24.2, seasUptakePct: 53.4 },
      { band: "65+ Years",     sharePct: 25.7, h1n1UptakePct: 22.6, seasUptakePct: 66.8 }
    ],
    education: [
      { level: "< 12 Years", sharePct: 8.8, h1n1UptakePct: 14.5, seasUptakePct: 39.8 },
      { level: "12 Years", sharePct: 21.6, h1n1UptakePct: 17.2, seasUptakePct: 43.2 },
      { level: "Some College", sharePct: 26.5, h1n1UptakePct: 21.1, seasUptakePct: 45.6 },
      { level: "College Graduate", sharePct: 43.1, h1n1UptakePct: 25.8, seasUptakePct: 52.4 }
    ],
    gender: [
      { gender: "Female", sharePct: 59.4, h1n1UptakePct: 21.9, seasUptakePct: 48.8 },
      { gender: "Male", sharePct: 40.6, h1n1UptakePct: 20.3, seasUptakePct: 43.3 }
    ],
    income: [
      { tier: "Below Poverty", sharePct: 10.1, h1n1UptakePct: 17.6, seasUptakePct: 38.9 },
      { tier: "<= $75,000, Above Poverty", sharePct: 47.9, h1n1UptakePct: 20.8, seasUptakePct: 46.5 },
      { tier: "> $75,000", sharePct: 42.0, h1n1UptakePct: 24.5, seasUptakePct: 51.2 }
    ]
  },

  // Pre-configured Personas for Simulation
  personas: [
    {
      id: "proactive-senior",
      name: "High-Risk Senior Citizen (65+)",
      tagline: "Receives annual physician advice; chronic condition prompts seasonal vigilance.",
      avatar: "👵",
      expectedH1N1: "68% (Likely)",
      expectedSeasonal: "88% (High Uptake)",
      data: {
        age_group: "65+ Years",
        education: "Some College",
        income_poverty: "<= $75,000, Above Poverty",
        health_insurance: 1,
        health_worker: 0,
        chronic_med_condition: 1,
        child_under_6_months: 0,
        doctor_recc_h1n1: 1,
        doctor_recc_seasonal: 1,
        behavioral_wash_hands: 1,
        behavioral_face_mask: 0,
        behavioral_avoidance: 1,
        behavioral_large_gatherings: 1,
        opinion_h1n1_vacc_effective: 5,
        opinion_h1n1_risk: 4,
        opinion_h1n1_sick_from_vacc: 1,
        opinion_seas_vacc_effective: 5,
        opinion_seas_risk: 5,
        opinion_seas_sick_from_vacc: 1,
        h1n1_concern: 3,
        h1n1_knowledge: 2
      }
    },
    {
      id: "hesitant-healthcare-worker",
      name: "Hesitant Healthcare Staff",
      tagline: "High viral knowledge & exposure, yet fears post-injection adverse reaction.",
      avatar: "🩺",
      expectedH1N1: "48% (Moderate)",
      expectedSeasonal: "58% (Moderate)",
      data: {
        age_group: "35 - 44 Years",
        education: "College Graduate",
        income_poverty: "> $75,000",
        health_insurance: 1,
        health_worker: 1,
        chronic_med_condition: 0,
        child_under_6_months: 0,
        doctor_recc_h1n1: 0,
        doctor_recc_seasonal: 0,
        behavioral_wash_hands: 1,
        behavioral_face_mask: 1,
        behavioral_avoidance: 1,
        behavioral_large_gatherings: 0,
        opinion_h1n1_vacc_effective: 4,
        opinion_h1n1_risk: 3,
        opinion_h1n1_sick_from_vacc: 4,
        opinion_seas_vacc_effective: 4,
        opinion_seas_risk: 3,
        opinion_seas_sick_from_vacc: 4,
        h1n1_concern: 2,
        h1n1_knowledge: 2
      }
    },
    {
      id: "uninsured-young-adult",
      name: "Uninsured Young Adult",
      tagline: "Age 22, no insurance, low perceived illness vulnerability, no doctor recommendation.",
      avatar: "📱",
      expectedH1N1: "9% (Unlikely)",
      expectedSeasonal: "14% (Unlikely)",
      data: {
        age_group: "18 - 34 Years",
        education: "12 Years",
        income_poverty: "Below Poverty",
        health_insurance: 0,
        health_worker: 0,
        chronic_med_condition: 0,
        child_under_6_months: 0,
        doctor_recc_h1n1: 0,
        doctor_recc_seasonal: 0,
        behavioral_wash_hands: 1,
        behavioral_face_mask: 0,
        behavioral_avoidance: 0,
        behavioral_large_gatherings: 0,
        opinion_h1n1_vacc_effective: 2,
        opinion_h1n1_risk: 1,
        opinion_h1n1_sick_from_vacc: 3,
        opinion_seas_vacc_effective: 2,
        opinion_seas_risk: 1,
        opinion_seas_sick_from_vacc: 3,
        h1n1_concern: 0,
        h1n1_knowledge: 0
      }
    },
    {
      id: "infant-caregiver",
      name: "Parent with Infant (<6 Months)",
      tagline: "Strongly motivated by cocooning strategy to shield newborn infant from transmission.",
      avatar: "👶",
      expectedH1N1: "76% (High Uptake)",
      expectedSeasonal: "82% (High Uptake)",
      data: {
        age_group: "18 - 34 Years",
        education: "College Graduate",
        income_poverty: "> $75,000",
        health_insurance: 1,
        health_worker: 0,
        chronic_med_condition: 0,
        child_under_6_months: 1,
        doctor_recc_h1n1: 1,
        doctor_recc_seasonal: 1,
        behavioral_wash_hands: 1,
        behavioral_face_mask: 1,
        behavioral_avoidance: 1,
        behavioral_large_gatherings: 1,
        opinion_h1n1_vacc_effective: 5,
        opinion_h1n1_risk: 4,
        opinion_h1n1_sick_from_vacc: 1,
        opinion_seas_vacc_effective: 5,
        opinion_seas_risk: 4,
        opinion_seas_sick_from_vacc: 1,
        h1n1_concern: 3,
        h1n1_knowledge: 2
      }
    },
    {
      id: "vaccine-skeptic",
      name: "Vaccine Skeptic",
      tagline: "Disbelieves vaccine efficacy and harbors intense fear of vaccine-induced illness.",
      avatar: "🛑",
      expectedH1N1: "3% (Unlikely)",
      expectedSeasonal: "5% (Unlikely)",
      data: {
        age_group: "35 - 44 Years",
        education: "Some College",
        income_poverty: "<= $75,000, Above Poverty",
        health_insurance: 1,
        health_worker: 0,
        chronic_med_condition: 0,
        child_under_6_months: 0,
        doctor_recc_h1n1: 0,
        doctor_recc_seasonal: 0,
        behavioral_wash_hands: 1,
        behavioral_face_mask: 0,
        behavioral_avoidance: 0,
        behavioral_large_gatherings: 0,
        opinion_h1n1_vacc_effective: 1,
        opinion_h1n1_risk: 1,
        opinion_h1n1_sick_from_vacc: 5,
        opinion_seas_vacc_effective: 1,
        opinion_seas_risk: 1,
        opinion_seas_sick_from_vacc: 5,
        h1n1_concern: 0,
        h1n1_knowledge: 0
      }
    },
    {
      id: "median-baseline",
      name: "Median Survey Baseline",
      tagline: "Average respondent characteristics across all 26,707 participants in the study.",
      avatar: "📊",
      expectedH1N1: "21% (Baseline)",
      expectedSeasonal: "47% (Baseline)",
      data: {
        age_group: "45 - 54 Years",
        education: "Some College",
        income_poverty: "<= $75,000, Above Poverty",
        health_insurance: 1,
        health_worker: 0,
        chronic_med_condition: 0,
        child_under_6_months: 0,
        doctor_recc_h1n1: 0,
        doctor_recc_seasonal: 0,
        behavioral_wash_hands: 1,
        behavioral_face_mask: 0,
        behavioral_avoidance: 1,
        behavioral_large_gatherings: 0,
        opinion_h1n1_vacc_effective: 3,
        opinion_h1n1_risk: 2,
        opinion_h1n1_sick_from_vacc: 2,
        opinion_seas_vacc_effective: 3,
        opinion_seas_risk: 2,
        opinion_seas_sick_from_vacc: 2,
        h1n1_concern: 1,
        h1n1_knowledge: 1
      }
    }
  ],

  // Methodology Pipeline Steps
  methodologySteps: [
    {
      step: "01",
      title: "Data Ingestion & Dataset Merging",
      methods: "Pandas merge on unique respondent_id",
      details: "Unified features.csv (36 independent variables) and labels.csv (h1n1_vaccine, seasonal_vaccine targets) into a single 26,707 x 38 matrix with zero duplicate loss."
    },
    {
      step: "02",
      title: "Data Quality & Missing Value Imputation",
      methods: "SimpleImputer (Median & Mode strategies)",
      details: "Numerical ratings imputed with median preserving Likert distributions; categorical attributes (employment, housing) imputed with mode to maintain dominant frequency distributions."
    },
    {
      step: "03",
      title: "Exploratory Data Analysis & Hypothesis Testing",
      methods: "Univariate, Bivariate distributions, Chi-Square, Pearson correlation",
      details: "Uncovered significant class imbalance in H1N1 (3.7 : 1). Validated statistical significance of clinical recommendations (chi2 = 3412.8, p < 0.0001)."
    },
    {
      step: "04",
      title: "Feature Preprocessing & Encoding",
      methods: "OneHotEncoder, LabelEncoder, StandardScaler",
      details: "Categorical demographics transformed into numerical matrices; features normalized for gradient-based and distance-sensitive linear baselines."
    },
    {
      step: "05",
      title: "Stratified Train / Test Partitioning",
      methods: "train_test_split (test_size=0.20, stratify=y, random_state=42)",
      details: "Preserved exact 21.24% positive class ratio across 21,365 training rows and 5,342 holdout test instances to prevent evaluation distribution bias."
    },
    {
      step: "06",
      title: "Multi-Algorithm Model Training",
      methods: "9 Machine Learning Algorithms benchmarked",
      details: "Evaluated Logistic Regression, Decision Tree, Random Forest, Extra Trees, AdaBoost, Gradient Boosting, XGBoost, LightGBM, and CatBoost."
    },
    {
      step: "07",
      title: "Hyperparameter Tuning & Cross-Validation",
      methods: "RandomizedSearchCV (5-Fold Stratified CV, scoring='roc_auc')",
      details: "Explored n_estimators [100-500], max_depth [3-8], learning_rate [0.01-0.1], subsample [0.7-1.0], colsample [0.7-1.0] to find optimum generalization."
    },
    {
      step: "08",
      title: "Final Production Model Selection",
      methods: "Tuned XGBoost (Test Accuracy 83.88%, ROC-AUC 0.8351)",
      details: "Selected Tuned XGBoost as champion based on superior F1-score (0.5532), precision (67.30%), and stable 5-fold cross-validation performance."
    }
  ],

  // Project Challenges and Documented Solutions
  challenges: [
    {
      challenge: "Class Imbalance in Primary Target",
      issue: "Only 21.24% of survey respondents took the H1N1 vaccine, making raw accuracy misleading (a baseline 'predict all 0' model achieves 78.8%).",
      solution: "Prioritized ROC-AUC (0.8357), Precision-Recall balance, and F1-score as the guiding optimization metrics rather than accuracy alone.",
      impact: "Prevented false sense of accuracy; ensured the model reliably captured positive uptake signals with 67.30% precision."
    },
    {
      challenge: "Substantial Missing Data in Public Health Survey",
      issue: "Survey respondents skipped sensitive demographic questions (e.g. health insurance had ~45% missing values, employment had ~40%).",
      solution: "Applied disciplined SimpleImputer strategies: median replacement for ordinal belief variables and most-frequent (mode) for categorical demographic features.",
      impact: "Retained all 26,707 rows without synthetic hallucination or destructive record deletion."
    },
    {
      challenge: "High Dimensional Categorical Variations",
      issue: "Mixed data types ranging from binary switches (0/1), ordinal scales (1-5), and nominal strings (census MSA, employment).",
      solution: "Engineered a modular preprocessing pipeline leveraging OneHotEncoding for tree-based boosters and StandardScaler for linear classifiers.",
      impact: "Enabled fair, consistent benchmarking across all 9 diverse machine learning paradigms."
    },
    {
      challenge: "Ensemble Overfitting vs Bias Trade-off",
      issue: "Complex deep trees could overfit noisy survey responses, whereas shallow trees failed to capture interaction effects.",
      solution: "Ran 5-fold Stratified RandomizedSearchCV tuning tree depth (max_depth=5), subsample (0.7), and learning rate (0.05).",
      impact: "Achieved optimal generalization, boosting test accuracy from 83.79% to 83.88% while preserving a 0.8351 ROC-AUC."
    }
  ]
};
