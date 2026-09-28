import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PredictorView } from './components/PredictorView';
import { ModelLeaderboardView } from './components/ModelLeaderboardView';
import { FeatureImportanceView } from './components/FeatureImportanceView';
import { DatasetInsightsView } from './components/DatasetInsightsView';
import { PublicHealthPolicyView } from './components/PublicHealthPolicyView';
import { ProfileComparisonModal } from './components/ProfileComparisonModal';
import { DEFAULT_SURVEY_DATA } from './data/modelData';
import { calculateVaccinePrediction } from './utils/predictor';
import { VaccineSurveyData } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<'predictor' | 'leaderboard' | 'features' | 'dataset' | 'policy'>('predictor');
  const [surveyData, setSurveyData] = useState<VaccineSurveyData>(DEFAULT_SURVEY_DATA);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const prediction = calculateVaccinePrediction(surveyData);

  const handleReset = () => {
    setSurveyData({ ...DEFAULT_SURVEY_DATA });
  };

  const handleExport = () => {
    const report = `
============================================================
VACCINE UPTAKE PREDICTION CLINICAL REPORT (PRCP-1014)
Date: ${new Date().toLocaleDateString()}
============================================================

1. PREDICTION RESULTS
------------------------------------------------------------
- H1N1 Flu Vaccine Uptake Probability: ${prediction.h1n1Probability}%
  Status: ${prediction.h1n1Prediction === 1 ? 'Likely to Vaccinate' : 'Hesitant / Unlikely to Vaccinate'}
  Confidence Tier: ${prediction.h1n1RiskLevel}

- Seasonal Flu Vaccine Uptake Probability: ${prediction.seasonalProbability}%
  Status: ${prediction.seasonalPrediction === 1 ? 'Likely to Vaccinate' : 'Hesitant / Unlikely to Vaccinate'}
  Confidence Tier: ${prediction.seasonalRiskLevel}

2. PATIENT PROFILE PARAMETERS
------------------------------------------------------------
- Age Group: ${surveyData.age_group}
- Biological Sex: ${surveyData.sex}
- Education Level: ${surveyData.education}
- Income / Poverty Tier: ${surveyData.income_poverty}
- Employment Status: ${surveyData.employment_status}
- Health Insurance: ${surveyData.health_insurance === 1 ? 'Covered' : 'Uninsured'}
- Doctor Recommended H1N1: ${surveyData.doctor_recc_h1n1 === 1 ? 'Yes' : 'No'}
- Doctor Recommended Seasonal: ${surveyData.doctor_recc_seasonal === 1 ? 'Yes' : 'No'}
- Chronic Medical Condition: ${surveyData.chronic_med_condition === 1 ? 'Yes' : 'No'}
- Healthcare Worker: ${surveyData.health_worker === 1 ? 'Yes' : 'No'}
- Infant Under 6 Months in Household: ${surveyData.child_under_6_months === 1 ? 'Yes' : 'No'}

3. PERCEPTIONS & OPINIONS (1 to 5 Scale)
------------------------------------------------------------
- H1N1 Vaccine Effectiveness Belief: ${surveyData.opinion_h1n1_vacc_effective}/5
- Perceived Personal Risk of H1N1 Infection: ${surveyData.opinion_h1n1_risk}/5
- Fear of Adverse Reaction/Sickness from H1N1 Vaccine: ${surveyData.opinion_h1n1_sick_from_vacc}/5
- Seasonal Vaccine Effectiveness Belief: ${surveyData.opinion_seas_vacc_effective}/5
- Perceived Personal Risk of Seasonal Flu: ${surveyData.opinion_seas_risk}/5

4. PRIMARY DRIVERS
------------------------------------------------------------
Positive Drivers (+):
${prediction.positiveDrivers.map(d => `  * ${d.factor}: ${d.impact}`).join('\n')}

Negative Barriers (-):
${prediction.negativeDrivers.map(d => `  * ${d.factor}: ${d.impact}`).join('\n')}

5. ACTIONABLE PUBLIC HEALTH RECOMMENDATIONS
------------------------------------------------------------
${prediction.recommendations.map((r, i) => `[${i + 1}] ${r}`).join('\n')}

============================================================
Generated via VaccinePredict ML Analytics (Based on CDC H1N1 Survey)
`;

    const blob = new Blob([report.trim()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vaccine-prediction-report-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCompare={() => setIsCompareOpen(true)}
        onExport={handleExport}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'predictor' && (
          <PredictorView
            data={surveyData}
            onChange={setSurveyData}
            prediction={prediction}
            onReset={handleReset}
          />
        )}

        {activeTab === 'leaderboard' && <ModelLeaderboardView />}

        {activeTab === 'features' && <FeatureImportanceView />}

        {activeTab === 'dataset' && <DatasetInsightsView />}

        {activeTab === 'policy' && <PublicHealthPolicyView />}
      </main>

      {/* Comparison Modal */}
      <ProfileComparisonModal
        currentProfile={surveyData}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">VaccinePredict</span>
            <span>&bull;</span>
            <span>PRCP-1014 Machine Learning Project</span>
          </div>
          <div className="text-slate-400">
            Based on CDC National 2009 H1N1 Flu Survey (26,707 Respondents)
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
