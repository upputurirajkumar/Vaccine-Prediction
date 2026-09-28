import React from 'react';
import { DATASET_STATS } from '../data/modelBenchmarks';
import { Database, PieChart, FileText, CheckCircle2, SplitSquareVertical, AlertCircle } from 'lucide-react';

export const EdaExplorer: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Database className="w-4 h-4" />
          <span>National 2009 H1N1 Flu Survey (NHFS)</span>
        </div>
        <h2 className="text-xl font-bold text-white">
          Exploratory Data Analysis & Dataset Architecture
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Collected by the National Center for Immunization and Respiratory Diseases (CDC), the survey measures telephone respondents across 36 behavioral, clinical, demographic, and perceptual dimensions.
        </p>

        {/* High Level Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <span className="text-slate-400 text-[10px] block uppercase">Total Respondents</span>
            <span className="text-lg font-bold text-white">{DATASET_STATS.totalRespondents.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <span className="text-slate-400 text-[10px] block uppercase">Features / Columns</span>
            <span className="text-lg font-bold text-teal-400">{DATASET_STATS.totalFeatures} Features</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <span className="text-slate-400 text-[10px] block uppercase">Train / Test Split</span>
            <span className="text-lg font-bold text-emerald-400">80% / 20%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <span className="text-slate-400 text-[10px] block uppercase">Target Classification</span>
            <span className="text-lg font-bold text-amber-400">Binary Multi-Output</span>
          </div>
        </div>
      </div>

      {/* Target Class Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* H1N1 Vaccine Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[11px] text-teal-400 font-bold uppercase tracking-wider block">Target 1</span>
              <h3 className="text-base font-bold text-white">H1N1 Flu Vaccine Uptake</h3>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
              Class Imbalanced (3.7 : 1)
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Only <strong>21.24%</strong> (5,674 individuals) received the H1N1 vaccine, while <strong>78.76%</strong> (21,033) did not, requiring stratified folds and ROC-AUC evaluation rather than naive accuracy.
          </p>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400">Did Not Receive (Class 0)</span>
                <span className="text-white font-bold">21,033 (78.8%)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-slate-600 h-full rounded-full" style={{ width: '78.8%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-teal-400">Received H1N1 (Class 1)</span>
                <span className="text-teal-400 font-bold">5,674 (21.2%)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-teal-400 h-full rounded-full" style={{ width: '21.2%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Seasonal Flu Vaccine Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[11px] text-teal-400 font-bold uppercase tracking-wider block">Target 2</span>
              <h3 className="text-base font-bold text-white">Seasonal Influenza Vaccine</h3>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Balanced Distribution
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Seasonal flu shows a much more balanced split with <strong>46.56%</strong> (12,435 individuals) vaccinated versus <strong>53.44%</strong> (14,272) unvaccinated, driven strongly by annual routine habits.
          </p>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400">Did Not Receive (Class 0)</span>
                <span className="text-white font-bold">14,272 (53.4%)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-slate-600 h-full rounded-full" style={{ width: '53.4%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-emerald-400">Received Seasonal (Class 1)</span>
                <span className="text-emerald-400 font-bold">12,435 (46.6%)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '46.6%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preprocessing & Feature Engineering Pipeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <SplitSquareVertical className="w-4 h-4 text-teal-400" />
          Data Preprocessing & Cleaning Strategy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
            <span className="font-bold text-teal-300 block mb-1">1. Missing Value Imputation</span>
            <p className="text-slate-400 leading-relaxed">
              Categorical columns imputed with <code className="text-teal-400">SimpleImputer(strategy='most_frequent')</code>; numerical opinions imputed using median values to preserve ordinal distributions.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
            <span className="font-bold text-emerald-300 block mb-1">2. Categorical Encoding</span>
            <p className="text-slate-400 leading-relaxed">
              Ordinal variables encoded linearly; nominal variables (e.g., census MSA, housing, employment) encoded with OneHotEncoder and LabelEncoder for gradient boosting compatibility.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
            <span className="font-bold text-amber-300 block mb-1">3. Stratified K-Fold CV</span>
            <p className="text-slate-400 leading-relaxed">
              Used <code className="text-teal-400">StratifiedKFold(n_splits=5)</code> to ensure identical positive/negative ratios across all 5 folds, preventing fold variance during RandomizedSearchCV.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
