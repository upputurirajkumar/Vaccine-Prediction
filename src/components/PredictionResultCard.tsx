import React, { useEffect, useState } from 'react';
import { PredictionResult, RespondentFeatures } from '../types/vaccine';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles,
  Stethoscope, 
  Share2, 
  Copy, 
  Shield, 
  AlertOctagon,
  TrendingUp,
  Award
} from 'lucide-react';

interface PredictionResultCardProps {
  result: PredictionResult;
  features: RespondentFeatures;
}

export const PredictionResultCard: React.FC<PredictionResultCardProps> = ({ result, features }) => {
  const [copied, setCopied] = useState(false);

  // Trigger celebratory confetti if both are high uptake
  useEffect(() => {
    if (result.h1n1Probability >= 70 && result.seasonalProbability >= 70) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#14b8a6', '#10b981', '#38bdf8'],
      });
    }
  }, [result.h1n1Probability, result.seasonalProbability]);

  const copySummary = () => {
    const text = `Vaccine Uptake ML Prediction:
• H1N1 Flu Vaccine: ${result.h1n1Probability}% (${result.h1n1RiskLevel})
• Seasonal Flu Vaccine: ${result.seasonalProbability}% (${result.seasonalRiskLevel})
Top Driver: ${result.positiveDrivers[0]?.name || 'N/A'}
Intervention Recommended: ${result.recommendations[0]?.title || 'Standard Routine Prompt'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-5">
      {/* Primary Dual Probability Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Machine Learning Inference (Tuned XGBoost)
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Vaccination Uptake Likelihood
            </h3>
          </div>

          <button
            onClick={copySummary}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-xs text-slate-300 transition border border-slate-700/60"
            title="Copy Report to Clipboard"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>

        {/* Dual Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          {/* H1N1 Vaccine Gauge */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-medium text-slate-400">Target 1</span>
                <h4 className="text-sm font-bold text-white">H1N1 Pandemic Flu</h4>
              </div>
              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                  result.h1n1Probability >= 60
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : result.h1n1Probability >= 35
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                }`}
              >
                {result.h1n1RiskLevel}
              </span>
            </div>

            <div className="my-4 flex items-baseline justify-between">
              <div className="flex items-baseline space-x-1.5">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {result.h1n1Probability}%
                </span>
                <span className="text-xs text-slate-400">probability</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Survey Baseline</span>
                <span className="text-xs font-mono font-medium text-slate-300">21.2%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  result.h1n1Probability >= 60
                    ? 'bg-gradient-to-r from-teal-400 to-emerald-400'
                    : result.h1n1Probability >= 35
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400'
                    : 'bg-gradient-to-r from-rose-500 to-red-400'
                }`}
                style={{ width: `${result.h1n1Probability}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>Class: {result.h1n1Prediction === 1 ? 'Will Vaccinate' : 'Will Not Vaccinate'}</span>
              <span className={result.h1n1Probability >= 21 ? 'text-emerald-400' : 'text-rose-400'}>
                {result.h1n1Probability >= 21 ? `+${result.h1n1Probability - 21}% vs Avg` : `${result.h1n1Probability - 21}% vs Avg`}
              </span>
            </div>
          </div>

          {/* Seasonal Flu Vaccine Gauge */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-medium text-slate-400">Target 2</span>
                <h4 className="text-sm font-bold text-white">Seasonal Influenza</h4>
              </div>
              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                  result.seasonalProbability >= 60
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : result.seasonalProbability >= 40
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                }`}
              >
                {result.seasonalRiskLevel}
              </span>
            </div>

            <div className="my-4 flex items-baseline justify-between">
              <div className="flex items-baseline space-x-1.5">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {result.seasonalProbability}%
                </span>
                <span className="text-xs text-slate-400">probability</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Survey Baseline</span>
                <span className="text-xs font-mono font-medium text-slate-300">46.6%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  result.seasonalProbability >= 60
                    ? 'bg-gradient-to-r from-teal-400 to-emerald-400'
                    : result.seasonalProbability >= 40
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400'
                    : 'bg-gradient-to-r from-rose-500 to-red-400'
                }`}
                style={{ width: `${result.seasonalProbability}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>Class: {result.seasonalPrediction === 1 ? 'Will Vaccinate' : 'Will Not Vaccinate'}</span>
              <span className={result.seasonalProbability >= 47 ? 'text-emerald-400' : 'text-rose-400'}>
                {result.seasonalProbability >= 47 ? `+${result.seasonalProbability - 47}% vs Avg` : `${result.seasonalProbability - 47}% vs Avg`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Influencers: Positive vs Negative Drivers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Positive Drivers */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center space-x-2 text-emerald-400 mb-3">
            <ArrowUpRight className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Key Promoting Factors (+ Uptake)
            </h4>
          </div>
          {result.positiveDrivers.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No significant positive drivers detected.</p>
          ) : (
            <div className="space-y-2">
              {result.positiveDrivers.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs"
                >
                  <span className="text-slate-200 font-medium">{d.name}</span>
                  <span className="font-mono text-[11px] text-emerald-400 font-semibold">{d.impact}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Negative Drivers / Hesitancy Barriers */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center space-x-2 text-rose-400 mb-3">
            <ArrowDownRight className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Hesitancy Barriers (- Uptake)
            </h4>
          </div>
          {result.negativeDrivers.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No major resistance barriers detected.</p>
          ) : (
            <div className="space-y-2">
              {result.negativeDrivers.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-rose-950/20 border border-rose-500/20 text-xs"
                >
                  <span className="text-slate-200 font-medium">{d.name}</span>
                  <span className="font-mono text-[11px] text-rose-400 font-semibold">{d.impact}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actionable Public Health Interventions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
          <Stethoscope className="w-4 h-4" />
          Recommended Public Health Interventions
        </h4>
        <div className="space-y-2.5">
          {result.recommendations.map((rec, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-100">{rec.title}</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                  {rec.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{rec.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
