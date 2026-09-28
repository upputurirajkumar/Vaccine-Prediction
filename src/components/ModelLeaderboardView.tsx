import React, { useState } from 'react';
import { MODEL_BENCHMARKS, BEST_MODEL_HYPERPARAMETERS, CONFUSION_MATRIX } from '../data/modelData';
import { ModelBenchmark } from '../types';
import { 
  Trophy, 
  ArrowUpDown, 
  Sliders, 
  Layers, 
  CheckCircle, 
  TrendingUp,
  Award,
  HelpCircle
} from 'lucide-react';

export const ModelLeaderboardView: React.FC = () => {
  const [sortField, setSortField] = useState<keyof ModelBenchmark>('rocAuc');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedModel, setSelectedModel] = useState<ModelBenchmark>(MODEL_BENCHMARKS[0]);

  const handleSort = (field: keyof ModelBenchmark) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedModels = [...MODEL_BENCHMARKS].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Winner Callout */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Winning Production Model: Tuned XGBoost
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Multi-Algorithm Benchmark &amp; Validation
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Nine supervised classification algorithms were trained and evaluated on 26,707 CDC survey records across 5-fold cross-validation. Tuned XGBoost emerged as the optimal production choice based on ROC-AUC (0.8351) and generalizability.
          </p>
        </div>

        {/* Quick KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div>
            <div className="text-xs text-slate-400">Winning Accuracy</div>
            <div className="text-2xl font-bold text-white">83.88%</div>
            <div className="text-[11px] text-teal-300">Tuned XGBoost</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Peak ROC-AUC</div>
            <div className="text-2xl font-bold text-white">0.8357</div>
            <div className="text-[11px] text-teal-300">Baseline XGBoost</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Peak Precision</div>
            <div className="text-2xl font-bold text-white">71.52%</div>
            <div className="text-[11px] text-teal-300">Random Forest</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Test Cohort Size</div>
            <div className="text-2xl font-bold text-white">5,342</div>
            <div className="text-[11px] text-slate-300">20% Holdout Split</div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              Machine Learning Model Leaderboard
            </h3>
            <p className="text-xs text-slate-500">
              Click any column header to re-sort models. Select a row to inspect its specifics below.
            </p>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1.5 self-start sm:self-auto bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            Sorted by: <span className="font-semibold text-slate-700 capitalize">{String(sortField)} ({sortDirection})</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Model Name</th>
                <th className="py-3 px-4">Family / Type</th>
                <th
                  onClick={() => handleSort('accuracy')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Accuracy <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('rocAuc')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors text-teal-700"
                >
                  <div className="flex items-center gap-1">
                    ROC-AUC <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('precision')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Precision <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('recall')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Recall <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('f1')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    F1-Score <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {sortedModels.map((model, idx) => {
                const isSelected = selectedModel.name === model.name;
                const isChampion = model.tuned;
                return (
                  <tr
                    key={model.name}
                    onClick={() => setSelectedModel(model)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-teal-50/70 font-semibold'
                        : isChampion
                        ? 'bg-emerald-50/30 hover:bg-slate-50'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-500">
                      #{idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      {model.name}
                      {model.tuned && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                          Production Choice
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{model.type}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {model.accuracy.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-4 font-black text-teal-700">
                      {model.rocAuc.toFixed(4)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {(model.precision * 100).toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {(model.recall * 100).toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {(model.f1 * 100).toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep-Dive Grid: Confusion Matrix & Hyperparameter Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Confusion Matrix (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-teal-600" />
                Test Set Confusion Matrix (Tuned XGBoost)
              </h3>
              <p className="text-xs text-slate-500">
                Evaluation on the 5,342 holdout survey respondents.
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-700 rounded-md">
              Total N = 5,342
            </span>
          </div>

          {/* Matrix Grid */}
          <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto my-4 text-center">
            {/* True Negative */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                True Negatives (TN)
              </div>
              <div className="text-2xl font-black text-emerald-900 my-1">
                {CONFUSION_MATRIX.trueNegative.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-700">
                Correctly predicted unvaccinated (Specificity: 93.8%)
              </div>
            </div>

            {/* False Positive */}
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl">
              <div className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">
                False Positives (FP)
              </div>
              <div className="text-2xl font-black text-rose-900 my-1">
                {CONFUSION_MATRIX.falsePositive.toLocaleString()}
              </div>
              <div className="text-[11px] text-rose-700">
                Predicted vaccinated, actually unvaccinated (Type I error)
              </div>
            </div>

            {/* False Negative */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
              <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                False Negatives (FN)
              </div>
              <div className="text-2xl font-black text-amber-900 my-1">
                {CONFUSION_MATRIX.falseNegative.toLocaleString()}
              </div>
              <div className="text-[11px] text-amber-700">
                Predicted hesitant, actually vaccinated (Type II error)
              </div>
            </div>

            {/* True Positive */}
            <div className="bg-teal-50 border border-teal-200 p-4 rounded-xl">
              <div className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
                True Positives (TP)
              </div>
              <div className="text-2xl font-black text-teal-900 my-1">
                {CONFUSION_MATRIX.truePositive.toLocaleString()}
              </div>
              <div className="text-[11px] text-teal-700">
                Correctly predicted vaccinated (Sensitivity / Recall: 47.0%)
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            <strong>Key Insight on Imbalance:</strong> In the survey, only 21.2% received the H1N1 vaccine. The model prioritizes high specificity (93.8%) and precision (67.3%), preventing false alarms while capturing the strongest behavioral signals.
          </p>
        </div>

        {/* Hyperparameter Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-1">
              <Sliders className="w-5 h-5 text-teal-600" />
              Optimal Hyperparameters
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Found via RandomizedSearchCV over 20 iterations with 5-fold cross-validation.
            </p>

            <div className="space-y-2 text-xs">
              {[
                { param: 'n_estimators', val: BEST_MODEL_HYPERPARAMETERS.n_estimators, note: 'Number of gradient boosted decision trees' },
                { param: 'max_depth', val: BEST_MODEL_HYPERPARAMETERS.max_depth, note: 'Maximum depth per tree to prevent overfitting' },
                { param: 'learning_rate (eta)', val: BEST_MODEL_HYPERPARAMETERS.learning_rate, note: 'Step size shrinkage used in updates' },
                { param: 'subsample', val: BEST_MODEL_HYPERPARAMETERS.subsample, note: 'Subsample ratio of the training instances' },
                { param: 'colsample_bytree', val: BEST_MODEL_HYPERPARAMETERS.colsample_bytree, note: 'Subsample ratio of columns when constructing trees' },
                { param: 'eval_metric', val: `'${BEST_MODEL_HYPERPARAMETERS.eval_metric}'`, note: 'Negative log-likelihood evaluation metric' },
                { param: 'random_state', val: BEST_MODEL_HYPERPARAMETERS.random_state, note: 'Seed ensuring full reproducibility across folds' }
              ].map((item) => (
                <div
                  key={item.param}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 font-mono"
                >
                  <span className="text-slate-700 font-bold">{item.param}</span>
                  <span className="text-teal-700 font-black">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/50 p-2.5 rounded-lg">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>XGBoost verified through cross-validation as the most robust model for public health deployment.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
