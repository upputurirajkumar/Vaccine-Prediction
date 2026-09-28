import React, { useState } from 'react';
import { BENCHMARK_MODELS, CONFUSION_MATRIX, DATASET_STATS } from '../data/modelBenchmarks';
import { ModelBenchmark } from '../types/vaccine';
import { 
  Trophy, 
  BarChart, 
  CheckCircle, 
  SlidersHorizontal, 
  HelpCircle, 
  TrendingUp, 
  Binary, 
  Layers,
  ArrowUpDown
} from 'lucide-react';

export const BenchmarkLeaderboard: React.FC = () => {
  const [sortKey, setSortKey] = useState<keyof ModelBenchmark>('rocAuc');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedModels = [...BENCHMARK_MODELS].sort((a, b) => {
    const valA = a[sortKey] as number;
    const valB = b[sortKey] as number;
    return sortAsc ? valA - valB : valB - valA;
  });

  const handleSort = (key: keyof ModelBenchmark) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Summary Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>PRCP-1014 Model Evaluation & Selection</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Comparative Benchmark: 9 Machine Learning Algorithms
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              To identify the most reliable predictor for vaccination behavior, nine supervised classification models were rigorously trained, evaluated, and cross-validated on the 2009 National Flu Survey.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 text-center">
              <span className="text-slate-400 text-[10px] block uppercase">Evaluated Models</span>
              <span className="text-base font-bold text-white">9 Algorithms</span>
            </div>
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 text-center">
              <span className="text-slate-400 text-[10px] block uppercase">Best Model</span>
              <span className="text-base font-bold text-teal-400">Tuned XGBoost</span>
            </div>
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 text-center">
              <span className="text-slate-400 text-[10px] block uppercase">Best ROC-AUC</span>
              <span className="text-base font-bold text-emerald-400">0.8357</span>
            </div>
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 text-center">
              <span className="text-slate-400 text-[10px] block uppercase">CV Folds</span>
              <span className="text-base font-bold text-slate-200">5-Fold Stratified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart className="w-5 h-5 text-teal-400" />
              Model Comparison Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Click any column header to sort models by metric
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Sorted by: <span className="text-teal-400 font-bold uppercase">{sortKey}</span> ({sortAsc ? 'Ascending' : 'Descending'})
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Model Name</th>
                <th 
                  onClick={() => handleSort('accuracy')}
                  className="py-3 px-3 cursor-pointer hover:text-white transition"
                >
                  <div className="flex items-center space-x-1">
                    <span>Accuracy</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('precision')}
                  className="py-3 px-3 cursor-pointer hover:text-white transition"
                >
                  <div className="flex items-center space-x-1">
                    <span>Precision</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('recall')}
                  className="py-3 px-3 cursor-pointer hover:text-white transition"
                >
                  <div className="flex items-center space-x-1">
                    <span>Recall</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('f1')}
                  className="py-3 px-3 cursor-pointer hover:text-white transition"
                >
                  <div className="flex items-center space-x-1">
                    <span>F1 Score</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('rocAuc')}
                  className="py-3 px-3 cursor-pointer hover:text-white transition text-teal-400"
                >
                  <div className="flex items-center space-x-1">
                    <span>ROC-AUC</span>
                    <ArrowUpDown className="w-3 h-3 text-teal-400" />
                  </div>
                </th>
                <th className="py-3 px-3 hidden md:table-cell">Key Characteristics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {sortedModels.map((m, idx) => (
                <tr
                  key={m.name}
                  className={`hover:bg-slate-800/40 transition ${
                    m.isBest ? 'bg-teal-500/10 border-l-4 border-l-teal-400' : ''
                  }`}
                >
                  <td className="py-3.5 px-3 font-sans font-medium text-slate-200">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 text-slate-500 text-xs font-mono">#{idx + 1}</span>
                      <span>{m.name}</span>
                      {m.isBest && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500 text-slate-900 font-bold uppercase font-sans">
                          Production Model
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-200">
                    {m.accuracy.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-3 text-slate-300">
                    {(m.precision / 100).toFixed(4)}
                  </td>
                  <td className="py-3.5 px-3 text-slate-300">
                    {(m.recall / 100).toFixed(4)}
                  </td>
                  <td className="py-3.5 px-3 text-slate-300 font-semibold">
                    {(m.f1 / 100).toFixed(4)}
                  </td>
                  <td className="py-3.5 px-3 text-teal-400 font-bold text-sm">
                    {(m.rocAuc / 100).toFixed(4)}
                  </td>
                  <td className="py-3.5 px-3 font-sans text-slate-400 text-[11px] hidden md:table-cell">
                    {m.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confusion Matrix & Tuning Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confusion Matrix Visualizer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Binary className="w-4 h-4 text-teal-400" />
                Confusion Matrix — Tuned XGBoost
              </h3>
              <p className="text-[11px] text-slate-400">
                Evaluated on 20% holdout test set (n = {CONFUSION_MATRIX.total.toLocaleString()})
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
              Accuracy: {CONFUSION_MATRIX.accuracy}%
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 max-w-md mx-auto">
            {/* True Negative */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                True Negatives (TN)
              </span>
              <span className="text-2xl font-mono font-bold text-white block">
                {CONFUSION_MATRIX.trueNegative.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Correctly predicted non-vaccinated
              </span>
            </div>

            {/* False Positive */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 text-center">
              <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">
                False Positives (FP)
              </span>
              <span className="text-2xl font-mono font-bold text-white block">
                {CONFUSION_MATRIX.falsePositive.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Type I Error (Overpredicted uptake)
              </span>
            </div>

            {/* False Negative */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
                False Negatives (FN)
              </span>
              <span className="text-2xl font-mono font-bold text-white block">
                {CONFUSION_MATRIX.falseNegative.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Type II Error (Missed vaccinated)
              </span>
            </div>

            {/* True Positive */}
            <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 text-center">
              <span className="text-[10px] uppercase font-bold text-teal-400 block mb-1">
                True Positives (TP)
              </span>
              <span className="text-2xl font-mono font-bold text-white block">
                {CONFUSION_MATRIX.truePositive.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Correctly predicted vaccinated
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between font-mono">
            <span>Specificity: <strong>93.84%</strong></span>
            <span>Sensitivity (Recall): <strong>46.96%</strong></span>
            <span>Precision: <strong>67.30%</strong></span>
          </div>
        </div>

        {/* Hyperparameter Optimization Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <SlidersHorizontal className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-bold text-white">
              Hyperparameter Tuning (RandomizedSearchCV)
            </h3>
          </div>

          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            The notebook performed 20 randomized iterations across 5 stratified folds to optimize the tree booster configuration, balancing bias and variance.
          </p>

          <div className="mt-4 space-y-2.5 text-xs font-mono">
            {[
              { param: 'n_estimators', value: '200', desc: 'Number of boosted trees to fit' },
              { param: 'max_depth', value: '5', desc: 'Maximum tree depth (prevents overfitting)' },
              { param: 'learning_rate', value: '0.05', desc: 'Step size shrinkage per boosting iteration' },
              { param: 'subsample', value: '0.7', desc: 'Ratio of training instances sampled per tree' },
              { param: 'colsample_bytree', value: '1.0', desc: 'Subsample ratio of columns when constructing each tree' },
              { param: 'eval_metric', value: "'logloss'", desc: 'Binary logistic log-loss optimization target' },
            ].map((hp) => (
              <div key={hp.param} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-800">
                <span className="text-teal-300 font-semibold">{hp.param}</span>
                <span className="text-slate-400 text-[11px] hidden sm:inline">{hp.desc}</span>
                <span className="px-2 py-0.5 rounded bg-slate-700/60 text-white font-bold">{hp.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-teal-950/20 border border-teal-500/20 text-xs text-teal-300">
            <strong>Why ROC-AUC over Accuracy?</strong> Due to the 78.8% vs 21.2% class imbalance in H1N1 uptake, a naive model predicting &ldquo;No&rdquo; every time achieves 78.8% accuracy. ROC-AUC (0.8357) measures genuine discriminatory power across all decision thresholds.
          </div>
        </div>
      </div>
    </div>
  );
};
