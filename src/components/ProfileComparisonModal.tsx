import React, { useState } from 'react';
import { VaccineSurveyData, PredictionResult } from '../types';
import { PRESET_PERSONAS } from '../data/modelData';
import { calculateVaccinePrediction } from '../utils/predictor';
import { X, GitCompare, ArrowRight, Check, AlertCircle } from 'lucide-react';

interface ProfileComparisonModalProps {
  currentProfile: VaccineSurveyData;
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileComparisonModal: React.FC<ProfileComparisonModalProps> = ({
  currentProfile,
  isOpen,
  onClose
}) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('hesitant_young_adult');

  if (!isOpen) return null;

  const currentPrediction = calculateVaccinePrediction(currentProfile);
  const comparePersona = PRESET_PERSONAS.find((p) => p.id === selectedPersonaId) || PRESET_PERSONAS[1];
  const comparePrediction = calculateVaccinePrediction(comparePersona.data);

  const h1n1Delta = currentPrediction.h1n1Probability - comparePrediction.h1n1Probability;
  const seasonalDelta = currentPrediction.seasonalProbability - comparePrediction.seasonalProbability;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <GitCompare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Side-by-Side Profile Comparison
              </h3>
              <p className="text-xs text-slate-500">
                Compare your current customized patient parameters against standard population benchmarks.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Persona selector for Profile B */}
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1.5">
              Select Comparative Persona for Profile B:
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersonaId(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedPersonaId === p.id
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Probability Delta Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* H1N1 Compare */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                H1N1 Vaccine Probability Comparison
              </div>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-[11px] text-slate-500">Profile A (Current)</div>
                  <div className="text-2xl font-black text-slate-900">
                    {currentPrediction.h1n1Probability}%
                  </div>
                </div>

                <div className="text-center px-3">
                  <div className="text-[11px] font-semibold text-slate-400">Delta</div>
                  <div className={`text-sm font-bold ${
                    h1n1Delta > 0 ? 'text-emerald-600' : h1n1Delta < 0 ? 'text-rose-600' : 'text-slate-600'
                  }`}>
                    {h1n1Delta > 0 ? `+${h1n1Delta}%` : `${h1n1Delta}%`}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-[11px] text-slate-500">Profile B ({comparePersona.name})</div>
                  <div className="text-2xl font-black text-slate-900">
                    {comparePrediction.h1n1Probability}%
                  </div>
                </div>
              </div>
            </div>

            {/* Seasonal Compare */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Seasonal Flu Probability Comparison
              </div>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-[11px] text-slate-500">Profile A (Current)</div>
                  <div className="text-2xl font-black text-slate-900">
                    {currentPrediction.seasonalProbability}%
                  </div>
                </div>

                <div className="text-center px-3">
                  <div className="text-[11px] font-semibold text-slate-400">Delta</div>
                  <div className={`text-sm font-bold ${
                    seasonalDelta > 0 ? 'text-emerald-600' : seasonalDelta < 0 ? 'text-rose-600' : 'text-slate-600'
                  }`}>
                    {seasonalDelta > 0 ? `+${seasonalDelta}%` : `${seasonalDelta}%`}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-[11px] text-slate-500">Profile B ({comparePersona.name})</div>
                  <div className="text-2xl font-black text-slate-900">
                    {comparePrediction.seasonalProbability}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attribute Comparison Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 font-bold text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Feature Attribute</th>
                  <th className="py-2.5 px-4">Profile A (Current)</th>
                  <th className="py-2.5 px-4">Profile B ({comparePersona.name})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                <tr>
                  <td className="py-2.5 px-4 text-slate-600">Doctor Recommendation (H1N1)</td>
                  <td className="py-2.5 px-4 font-bold">{currentProfile.doctor_recc_h1n1 === 1 ? 'Yes (+34%)' : 'No'}</td>
                  <td className="py-2.5 px-4 font-bold">{comparePersona.data.doctor_recc_h1n1 === 1 ? 'Yes (+34%)' : 'No'}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-slate-600">Belief in Vaccine Efficacy</td>
                  <td className="py-2.5 px-4">{currentProfile.opinion_h1n1_vacc_effective} / 5</td>
                  <td className="py-2.5 px-4">{comparePersona.data.opinion_h1n1_vacc_effective} / 5</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-slate-600">Perceived Risk of Infection</td>
                  <td className="py-2.5 px-4">{currentProfile.opinion_h1n1_risk} / 5</td>
                  <td className="py-2.5 px-4">{comparePersona.data.opinion_h1n1_risk} / 5</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-slate-600">Fear of Vaccine Sickness</td>
                  <td className="py-2.5 px-4">{currentProfile.opinion_h1n1_sick_from_vacc} / 5</td>
                  <td className="py-2.5 px-4">{comparePersona.data.opinion_h1n1_sick_from_vacc} / 5</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-slate-600">Health Insurance Coverage</td>
                  <td className="py-2.5 px-4">{currentProfile.health_insurance === 1 ? 'Covered' : 'Uninsured'}</td>
                  <td className="py-2.5 px-4">{comparePersona.data.health_insurance === 1 ? 'Covered' : 'Uninsured'}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-slate-600">Chronic Medical Condition</td>
                  <td className="py-2.5 px-4">{currentProfile.chronic_med_condition === 1 ? 'Present' : 'None'}</td>
                  <td className="py-2.5 px-4">{comparePersona.data.chronic_med_condition === 1 ? 'Present' : 'None'}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-slate-600">Age Bracket</td>
                  <td className="py-2.5 px-4">{currentProfile.age_group}</td>
                  <td className="py-2.5 px-4">{comparePersona.data.age_group}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
