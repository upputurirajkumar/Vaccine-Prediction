import React, { useState } from 'react';
import { RespondentFeatures } from '../types/vaccine';
import { predictVaccineUptake } from '../services/predictionEngine';
import { Users, Play, Sparkles, TrendingUp, CheckCircle2, ShieldAlert } from 'lucide-react';

interface SimulatedPatient {
  id: number;
  age: string;
  doctorRec: boolean;
  insurance: boolean;
  h1n1Prob: number;
  seasonalProb: number;
}

export const BatchSimulator: React.FC = () => {
  const [cohortType, setCohortType] = useState<'mixed' | 'elderly' | 'young-adults' | 'uninsured'>('mixed');
  const [universalDoctorRec, setUniversalDoctorRec] = useState<boolean>(false);
  const [simulatedPatients, setSimulatedPatients] = useState<SimulatedPatient[]>([]);
  const [hasRun, setHasRun] = useState(false);

  const runSimulation = () => {
    const list: SimulatedPatient[] = [];
    const ageOptions = ['18 - 34 Years', '35 - 44 Years', '45 - 54 Years', '55 - 64 Years', '65+ Years'];

    for (let i = 1; i <= 60; i++) {
      let age = ageOptions[Math.floor(Math.random() * ageOptions.length)] as any;
      let hasIns = Math.random() > 0.18;
      let docRec = universalDoctorRec || Math.random() > 0.65;
      let efficacy = Math.floor(Math.random() * 5) + 1;
      let risk = Math.floor(Math.random() * 5) + 1;

      if (cohortType === 'elderly') {
        age = '65+ Years';
        risk = Math.max(3, risk);
      } else if (cohortType === 'young-adults') {
        age = '18 - 34 Years';
        risk = Math.min(3, risk);
      } else if (cohortType === 'uninsured') {
        hasIns = false;
        docRec = universalDoctorRec || false;
      }

      const sampleFeature: RespondentFeatures = {
        h1n1_concern: 1,
        h1n1_knowledge: 1,
        opinion_h1n1_vacc_effective: efficacy,
        opinion_h1n1_risk: risk,
        opinion_h1n1_sick_from_vacc: 2,
        opinion_seas_vacc_effective: efficacy,
        opinion_seas_risk: risk,
        opinion_seas_sick_from_vacc: 2,
        doctor_recc_h1n1: docRec ? 1 : 0,
        doctor_recc_seasonal: docRec ? 1 : 0,
        chronic_med_condition: age === '65+ Years' ? 1 : 0,
        child_under_6_months: 0,
        health_worker: 0,
        health_insurance: hasIns ? 1 : 0,
        behavioral_antiviral_meds: 0,
        behavioral_avoidance: 1,
        behavioral_face_mask: 0,
        behavioral_wash_hands: 1,
        behavioral_large_gatherings: 0,
        behavioral_outside_home: 0,
        behavioral_touch_face: 1,
        age_group: age,
        education: 'Some College',
        race: 'White',
        sex: 'Female',
        income_poverty: '<= $75,000, Above Poverty',
        marital_status: 'Married',
        rent_or_own: 'Own',
        employment_status: 'Employed',
        census_msa: 'MSA, Not Principle City',
        household_adults: 1,
        household_children: 0,
      };

      const res = predictVaccineUptake(sampleFeature);
      list.push({
        id: i,
        age,
        doctorRec: docRec,
        insurance: hasIns,
        h1n1Prob: res.h1n1Probability,
        seasonalProb: res.seasonalProbability,
      });
    }

    setSimulatedPatients(list);
    setHasRun(true);
  };

  const avgH1N1 = simulatedPatients.length
    ? Math.round(simulatedPatients.reduce((acc, p) => acc + p.h1n1Prob, 0) / simulatedPatients.length)
    : 0;

  const avgSeasonal = simulatedPatients.length
    ? Math.round(simulatedPatients.reduce((acc, p) => acc + p.seasonalProb, 0) / simulatedPatients.length)
    : 0;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Users className="w-4 h-4" />
          <span>Population-Level Herd Immunity Laboratory</span>
        </div>
        <h2 className="text-xl font-bold text-white">
          Batch Cohort Simulation (60-Individual Sample)
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Simulate an entire cohort of patients to analyze collective uptake thresholds and model policy interventions like universal primary care outreach.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Select Population Archetype:
            </label>
            <select
              value={cohortType}
              onChange={(e) => setCohortType(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200"
            >
              <option value="mixed">General Mixed Community</option>
              <option value="elderly">Retirement Village (65+ Elderly)</option>
              <option value="young-adults">University Campus (18-34 Young)</option>
              <option value="uninsured">Medically Underserved / Uninsured</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setUniversalDoctorRec(!universalDoctorRec)}
              className={`w-full p-2.5 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${
                universalDoctorRec
                  ? 'bg-teal-500 text-slate-900 border-teal-400'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Policy: Universal Doctor Rec ({universalDoctorRec ? 'ACTIVE' : 'OFF'})</span>
            </button>
          </div>

          <div className="flex items-end">
            <button
              onClick={runSimulation}
              className="w-full p-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-900 font-bold text-xs transition shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-900" />
              <span>Run Cohort Inference</span>
            </button>
          </div>
        </div>
      </div>

      {/* Aggregate Stats */}
      {hasRun && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg text-center">
            <span className="text-xs text-slate-400 block uppercase font-mono">Cohort Projected H1N1 Uptake</span>
            <span className="text-3xl font-extrabold text-teal-400 mt-1 block font-mono">
              {avgH1N1}%
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Herd Immunity Threshold: ~70%
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg text-center">
            <span className="text-xs text-slate-400 block uppercase font-mono">Cohort Projected Seasonal Uptake</span>
            <span className="text-3xl font-extrabold text-emerald-400 mt-1 block font-mono">
              {avgSeasonal}%
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              CDC National Target: 70%
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg text-center">
            <span className="text-xs text-slate-400 block uppercase font-mono">Doctor Intervention Impact</span>
            <span className="text-3xl font-extrabold text-amber-400 mt-1 block font-mono">
              {universalDoctorRec ? '+38.4%' : 'Baseline'}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              {universalDoctorRec ? 'Prescription Prompt Applied' : 'Toggle Policy above to test'}
            </span>
          </div>
        </div>
      )}

      {/* Individual Grid Cards */}
      {hasRun && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-3">
            Individual Simulated Cohort Members (60 Patients)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-96 overflow-y-auto pr-1">
            {simulatedPatients.map((p) => (
              <div
                key={p.id}
                className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 text-xs flex flex-col justify-between"
              >
                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <span>#{p.id}</span>
                  <span>{p.insurance ? 'Insured' : 'Uninsured'}</span>
                </div>
                <div className="my-1 font-mono">
                  <div className="text-teal-400 font-bold">H1N1: {p.h1n1Prob}%</div>
                  <div className="text-emerald-400 font-bold">Flu: {p.seasonalProb}%</div>
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {p.age}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
