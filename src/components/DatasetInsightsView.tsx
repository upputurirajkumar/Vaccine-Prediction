import React from 'react';
import { DATASET_SUMMARY } from '../data/modelData';
import { 
  Database, 
  FileSpreadsheet, 
  PieChart, 
  GitBranch, 
  Filter, 
  CheckCircle2, 
  Info
} from 'lucide-react';

export const DatasetInsightsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Database className="w-5 h-5 text-teal-600" />
          CDC National 2009 H1N1 Flu Survey Dataset &amp; Preprocessing
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Detailed overview of the survey characteristics, class imbalance handling, missing value imputation, and pipeline transformations.
        </p>
      </div>

      {/* Dataset Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Survey Records</span>
          <div className="text-2xl font-black text-slate-900 mt-1">26,707</div>
          <span className="text-[11px] text-teal-600 font-medium">Unique Respondents</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Feature Variables</span>
          <div className="text-2xl font-black text-slate-900 mt-1">36</div>
          <span className="text-[11px] text-teal-600 font-medium">Demographic, Clinical &amp; Opinion</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Outcomes</span>
          <div className="text-2xl font-black text-slate-900 mt-1">2</div>
          <span className="text-[11px] text-teal-600 font-medium">H1N1 &amp; Seasonal Vaccines</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Train / Test Split</span>
          <div className="text-2xl font-black text-slate-900 mt-1">80% / 20%</div>
          <span className="text-[11px] text-teal-600 font-medium">Stratified Split (5,342 Test)</span>
        </div>
      </div>

      {/* Class Imbalance & Preprocessing Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Imbalance Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2 text-base">
            <PieChart className="w-5 h-5 text-teal-600" />
            Target Variable Distributions &amp; Class Imbalance
          </h3>
          <p className="text-xs text-slate-600 mb-6">
            The dataset exhibits noticeable class imbalance for the H1N1 target, requiring evaluation metrics like ROC-AUC, precision, and F1-score over simple accuracy.
          </p>

          <div className="space-y-6">
            {/* H1N1 Distribution */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>H1N1 Vaccine Uptake (Target 1)</span>
                <span className="text-teal-700">21.2% Vaccinated (5,674 / 26,707)</span>
              </div>
              <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex">
                <div className="bg-teal-600 h-full" style={{ width: '21.2%' }} title="21.2% Vaccinated" />
                <div className="bg-slate-300 h-full" style={{ width: '78.8%' }} title="78.8% Unvaccinated" />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>Vaccinated: 5,674 (21.2%)</span>
                <span>Unvaccinated: 21,033 (78.8%)</span>
              </div>
            </div>

            {/* Seasonal Flu Distribution */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>Seasonal Flu Vaccine Uptake (Target 2)</span>
                <span className="text-indigo-700">46.6% Vaccinated (12,435 / 26,707)</span>
              </div>
              <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex">
                <div className="bg-indigo-600 h-full" style={{ width: '46.6%' }} title="46.6% Vaccinated" />
                <div className="bg-slate-300 h-full" style={{ width: '53.4%' }} title="53.4% Unvaccinated" />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>Vaccinated: 12,435 (46.6%)</span>
                <span>Unvaccinated: 14,272 (53.4%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Preprocessing Workflow */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-2 text-base">
            <GitBranch className="w-5 h-5 text-teal-600" />
            Data Preparation &amp; Engineering Pipeline
          </h3>
          <p className="text-xs text-slate-600 mb-4">
            Systematic steps applied in the notebook before training the machine learning models.
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px] font-black">1</span>
                Dataset Merging on respondent_id
              </div>
              <p className="text-slate-600">
                Inner-joined <code className="text-teal-700 bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">features.csv</code> (36 columns) and <code className="text-teal-700 bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">labels.csv</code> (3 columns) on <code className="font-mono">respondent_id</code> to form a unified DataFrame of 26,707 rows.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px] font-black">2</span>
                Missing Value Imputation (SimpleImputer)
              </div>
              <p className="text-slate-600">
                Features with missing responses (e.g. <code className="font-mono">health_insurance</code>, <code className="font-mono">employment_industry</code>) were imputed using median strategies for ordinal/numeric fields and most-frequent (mode) for categorical demographic features.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px] font-black">3</span>
                Encoding &amp; Feature Scaling
              </div>
              <p className="text-slate-600">
                Applied LabelEncoder and OneHotEncoder for categorical attributes (age group, education, poverty level, marital status, housing status). Applied StandardScaler to normalize distributions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
