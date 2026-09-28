import React, { useState } from 'react';
import { FEATURE_IMPORTANCES } from '../data/modelBenchmarks';
import { Sliders, Info, ShieldCheck, Stethoscope, Users, CreditCard, Sparkles } from 'lucide-react';

export const FeatureImportanceExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Clinical', 'Opinion', 'Access', 'Demographics', 'Awareness'];

  const filteredFeatures = selectedCategory === 'All'
    ? FEATURE_IMPORTANCES
    : FEATURE_IMPORTANCES.filter((f) => f.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Sliders className="w-4 h-4" />
          <span>Explainable AI & Feature Attribution</span>
        </div>
        <h2 className="text-xl font-bold text-white">
          What Drives Vaccination Uptake Decisions?
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Feature importance metrics extracted from the Tuned XGBoost model reveal that direct clinical guidance and psychological threat appraisal dominate decisions, far outweighing passive demographic traits.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-teal-500 text-slate-900 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Importance Bar Charts */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
          <span>Ranked Feature Importance Weight (%)</span>
          <span className="text-xs text-slate-500 font-mono">Tuned XGBoost Gain Metric</span>
        </h3>

        <div className="space-y-4">
          {filteredFeatures.map((item, index) => {
            const widthPct = (item.importance / 25) * 100;
            return (
              <div key={item.feature} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-slate-500 w-5">#{index + 1}</span>
                    <span className="font-medium text-slate-200">{item.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                      {item.category}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-teal-400">{item.importance}%</span>
                </div>

                <div className="w-full bg-slate-800/80 rounded-full h-3 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 transition-all duration-500"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Architectural Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center space-x-2 text-teal-400 mb-2">
            <Stethoscope className="w-5 h-5" />
            <h4 className="text-sm font-bold text-white">1. Clinical Prescriptions</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A doctor recommendation increases H1N1 vaccination odds by more than <strong>4.5x</strong>. Individuals without a doctor recommendation have a baseline uptake of only 13%, jumping to over 54% when recommended.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center space-x-2 text-emerald-400 mb-2">
            <ShieldCheck className="w-5 h-5" />
            <h4 className="text-sm font-bold text-white">2. Health Belief Model</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Perceived illness susceptibility (<code className="text-teal-300">opinion_risk</code>) and vaccine efficacy (<code className="text-teal-300">opinion_vacc_effective</code>) account for 32.9% of model decisions. Fear of vaccine sickness is the single largest negative drag.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center space-x-2 text-amber-400 mb-2">
            <CreditCard className="w-5 h-5" />
            <h4 className="text-sm font-bold text-white">3. Systemic Access</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Health insurance status represents 8.4% of predictive weight. Uninsured individuals face structural friction, compounding lower physician touchpoints with direct out-of-pocket costs.
          </p>
        </div>
      </div>
    </div>
  );
};
