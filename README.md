# Vaccine Uptake Predictor & ML Analytics (PRCP-1014)

Interactive web application and machine learning deployment of **PRCP-1014: Vaccine Prediction using Machine Learning**, originally based on the National 2009 H1N1 Flu Survey (26,707 respondents).

## Overview
This platform predicts whether an individual will receive the **H1N1 Influenza Vaccine** and the **Seasonal Influenza Vaccine** using models trained across demographic, clinical, and behavioral variables.

## Evaluated Machine Learning Models
| Model | Accuracy | ROC-AUC | Precision | Recall | F1 Score |
|---|---|---|---|---|---|
| **Tuned XGBoost (Production Champion)** | **83.88%** | **0.8351** | **67.30%** | **46.96%** | **0.5532** |
| XGBoost (Baseline) | 83.79% | 0.8357 | 67.05% | 46.61% | 0.5499 |
| CatBoost | 84.09% | 0.8347 | 68.97% | 45.64% | 0.5493 |
| LightGBM | 83.73% | 0.8341 | 66.79% | 46.61% | 0.5490 |
| Gradient Boosting | 83.75% | 0.8308 | 68.11% | 44.23% | 0.5363 |
| AdaBoost | 83.34% | 0.8268 | 67.88% | 40.97% | 0.5110 |
| Random Forest | 83.79% | 0.8266 | 71.52% | 39.38% | 0.5080 |
| Extra Trees | 83.71% | 0.8251 | 70.29% | 40.44% | 0.5134 |
| Logistic Regression | 83.68% | 0.8228 | 68.71% | 42.56% | 0.5256 |
| Decision Tree | 81.21% | 0.7777 | 58.30% | 40.53% | 0.4782 |

## Key Insights & Top Features
1. **Doctor's Recommendation (H1N1 & Seasonal)**: The single strongest determinant of vaccination uptake with an odds ratio > 8x.
2. **Perceived Risk of Infection**: Personal vulnerability estimate significantly drives action.
3. **Vaccine Efficacy Belief**: Belief in the vaccine's protective power directly correlates with uptake.
4. **Fear of Vaccine Sickness**: The primary negative barrier; effectively mitigated through clinical education on mild vs. severe illness.
5. **Health Insurance**: Removing co-pays and financial friction boosts coverage among lower-income groups.

## Application Features
- **Real-Time Prediction Simulator**: Live dual-probability calculation for H1N1 and seasonal vaccines with confidence tiers.
- **Explainable Driver Attribution**: Shows top catalysts (+) and barriers (-) influencing the prediction for the specific profile.
- **Model Leaderboard**: Interactive sorting, confusion matrix analysis, and hyperparameter inspection.
- **Feature Importance Explorer**: Ranked gain importance bars across healthcare, beliefs, demographics, and behavior.
- **Public Health Policy Center**: Actionable interventions and an interactive community herd immunity transmission simulator.
- **Side-by-Side Profile Comparison**: Compare custom scenarios with pre-configured personas.
- **Clinical Report Export**: Download structured patient prediction summaries.

## Tech Stack
- Pure HTML5, CSS3 (Design System with Dark/Light Themes), and Vanilla JavaScript (ES6+).
- Zero external CSS or JavaScript framework dependencies; completely self-contained static site ready for GitHub Pages.
