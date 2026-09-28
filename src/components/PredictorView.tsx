import React, { useState } from 'react';
import { VaccineSurveyData, PredictionResult } from '../types';
import { PRESET_PERSONAS } from '../data/modelData';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Stethoscope, 
  ShieldAlert, 
  HeartPulse, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Users, 
  BrainCircuit, 
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PredictorViewProps {
  data: VaccineSurveyData;
  onChange: (data: VaccineSurveyData) => void;
  prediction: PredictionResult;
  onReset: () => void;
}

export const PredictorView: React.FC<PredictorViewProps> = ({
  data,
  onChange,
  prediction,
  onReset
}) => {
  const [activeFormSection, setActiveFormSection] = useState<'clinical' | 'beliefs' | 'behaviors' | 'demographics'>('clinical');

  const updateField = <K extends keyof VaccineSurveyData>(key: K, value: VaccineSurveyData[K]) => {
    const updated = { ...data, [key]: value };
    onChange(updated);
  };

  const applyPersona = (personaId: string) => {
    const persona = PRESET_PERSONAS.find((p) => p.id === personaId);
    if (persona) {
      onChange({ ...persona.data });
      if (persona.id === 'healthcare_worker' || persona.id === 'senior_chronic') {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner & Quick Persona Selector */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-teal-600" />
              Real-Time Vaccine Uptake Prediction Engine
            </h2>
            <p className="text-sm text-slate-600">
              Simulates probability using tuned XGBoost and logistic regression models trained on the CDC 2009 H1N1 survey.
            </p>
          </div>
          <button
            onClick={onReset}
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Median Default
          </button>
        </div>

        {/* Quick Fill Personas */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
            Load Pre-Configured Test Personas:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {PRESET_PERSONAS.map((p) => (
              <button
                key={p.id}
                onClick={() => applyPersona(p.id)}
                className="p-2.5 text-left rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all text-xs group cursor-pointer"
              >
                <div className="font-semibold text-slate-800 group-hover:text-teal-700 truncate">
                  {p.name}
                </div>
                <div className="text-[10px] text-teal-600 font-medium truncate mt-0.5">
                  {p.badge}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Form Inputs (Left) and Prediction Dashboard (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Input Parameter Tabs & Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Section Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveFormSection('clinical')}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg text-center transition-all cursor-pointer whitespace-nowrap ${
                activeFormSection === 'clinical'
                  ? 'bg-white text-teal-700 font-semibold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              1. Clinical &amp; Medical
            </button>
            <button
              onClick={() => setActiveFormSection('beliefs')}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg text-center transition-all cursor-pointer whitespace-nowrap ${
                activeFormSection === 'beliefs'
                  ? 'bg-white text-teal-700 font-semibold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              2. Beliefs &amp; Risk
            </button>
            <button
              onClick={() => setActiveFormSection('behaviors')}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg text-center transition-all cursor-pointer whitespace-nowrap ${
                activeFormSection === 'behaviors'
                  ? 'bg-white text-teal-700 font-semibold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              3. Preventive Habits
            </button>
            <button
              onClick={() => setActiveFormSection('demographics')}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg text-center transition-all cursor-pointer whitespace-nowrap ${
                activeFormSection === 'demographics'
                  ? 'bg-white text-teal-700 font-semibold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              4. Demographics
            </button>
          </div>

          <div className="p-6">
            {/* Section 1: Clinical & Medical Background */}
            {activeFormSection === 'clinical' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
                    <Stethoscope className="w-5 h-5 text-teal-600" />
                    Physician Interaction &amp; Clinical Health
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Physician recommendation has been shown by the study to carry the highest single feature weight for vaccine acceptance.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Doctor Recc H1N1 */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        Doctor Rec. for H1N1
                      </div>
                      <div className="text-xs text-slate-500">
                        Physician verbally advised shot
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.doctor_recc_h1n1 === 1}
                        onChange={(e) => updateField('doctor_recc_h1n1', e.target.checked ? 1 : 0)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>

                  {/* Doctor Recc Seasonal */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        Doctor Rec. for Seasonal
                      </div>
                      <div className="text-xs text-slate-500">
                        Physician advised seasonal flu shot
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.doctor_recc_seasonal === 1}
                        onChange={(e) => updateField('doctor_recc_seasonal', e.target.checked ? 1 : 0)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>

                  {/* Health Worker */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        Healthcare Worker
                      </div>
                      <div className="text-xs text-slate-500">
                        Employed in medical / clinic role
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.health_worker === 1}
                        onChange={(e) => updateField('health_worker', e.target.checked ? 1 : 0)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>

                  {/* Health Insurance */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        Health Insurance
                      </div>
                      <div className="text-xs text-slate-500">
                        Has private or public coverage
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.health_insurance === 1}
                        onChange={(e) => updateField('health_insurance', e.target.checked ? 1 : 0)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>

                  {/* Chronic Medical Condition */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        Chronic Medical Condition
                      </div>
                      <div className="text-xs text-slate-500">
                        Asthma, diabetes, heart disease, etc.
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.chronic_med_condition === 1}
                        onChange={(e) => updateField('chronic_med_condition', e.target.checked ? 1 : 0)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>

                  {/* Child under 6 months */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        Infant in Household (&lt;6 mo)
                      </div>
                      <div className="text-xs text-slate-500">
                        Child too young for flu immunization
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.child_under_6_months === 1}
                        onChange={(e) => updateField('child_under_6_months', e.target.checked ? 1 : 0)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                </div>

                {/* General Concern & Knowledge Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      General Concern Level about H1N1
                    </label>
                    <select
                      value={data.h1n1_concern}
                      onChange={(e) => updateField('h1n1_concern', Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value={0}>0 - Not at all concerned</option>
                      <option value={1}>1 - Slightly concerned</option>
                      <option value={2}>2 - Somewhat concerned</option>
                      <option value={3}>3 - Very concerned</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Subject Matter Knowledge of H1N1
                    </label>
                    <select
                      value={data.h1n1_knowledge}
                      onChange={(e) => updateField('h1n1_knowledge', Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value={0}>0 - No knowledge</option>
                      <option value={1}>1 - A little knowledge</option>
                      <option value={2}>2 - A lot of knowledge</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Section 2: Beliefs, Efficacy & Risk Opinions */}
            {activeFormSection === 'beliefs' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
                    <ShieldAlert className="w-5 h-5 text-teal-600" />
                    Vaccine Opinions, Efficacy Beliefs &amp; Perceived Risk
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Evaluated on a 1 (Not at all / Lowest) to 5 (Extremely / Highest) Likert scale as collected by the CDC.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* H1N1 Effectiveness */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-800">
                        Belief: H1N1 Vaccine is Effective
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                        {data.opinion_h1n1_vacc_effective} / 5
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={data.opinion_h1n1_vacc_effective}
                      onChange={(e) => updateField('opinion_h1n1_vacc_effective', Number(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                      <span>1 (Not effective)</span>
                      <span>3 (Moderate)</span>
                      <span>5 (Very effective)</span>
                    </div>
                  </div>

                  {/* H1N1 Perceived Risk */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-800">
                        Perception: Risk of Getting Sick without H1N1 Vaccine
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                        {data.opinion_h1n1_risk} / 5
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={data.opinion_h1n1_risk}
                      onChange={(e) => updateField('opinion_h1n1_risk', Number(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                      <span>1 (Very low risk)</span>
                      <span>3 (Somewhat)</span>
                      <span>5 (Very high risk)</span>
                    </div>
                  </div>

                  {/* H1N1 Fear of Sickness */}
                  <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        Worry / Fear of Getting Sick FROM H1N1 Vaccine
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        {data.opinion_h1n1_sick_from_vacc} / 5
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={data.opinion_h1n1_sick_from_vacc}
                      onChange={(e) => updateField('opinion_h1n1_sick_from_vacc', Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                      <span>1 (Not worried)</span>
                      <span>3 (Somewhat worried)</span>
                      <span>5 (Extremely worried)</span>
                    </div>
                  </div>

                  {/* Seasonal Flu Opinions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Seasonal Vaccine Efficacy</span>
                        <span className="text-teal-700">{data.opinion_seas_vacc_effective}/5</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={data.opinion_seas_vacc_effective}
                        onChange={(e) => updateField('opinion_seas_vacc_effective', Number(e.target.value))}
                        className="w-full accent-teal-600 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Seasonal Flu Risk Perception</span>
                        <span className="text-teal-700">{data.opinion_seas_risk}/5</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={data.opinion_seas_risk}
                        onChange={(e) => updateField('opinion_seas_risk', Number(e.target.value))}
                        className="w-full accent-teal-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section 3: Preventive Habits & Behaviors */}
            {activeFormSection === 'behaviors' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
                    <HeartPulse className="w-5 h-5 text-teal-600" />
                    Personal Protective &amp; Behavioral Habits
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Indicates general preventative health engagement and compliance with public health hygiene advisories.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'behavioral_wash_hands', label: 'Frequent Hand Washing', desc: 'Washes hands often with soap or sanitizer' },
                    { key: 'behavioral_avoidance', label: 'Avoids Sick Individuals', desc: 'Avoids close contact with people with flu symptoms' },
                    { key: 'behavioral_face_mask', label: 'Face Mask Usage', desc: 'Bought or wore a face mask during outbreaks' },
                    { key: 'behavioral_large_gatherings', label: 'Avoids Large Gatherings', desc: 'Reduced attendance at crowded public venues' },
                    { key: 'behavioral_outside_home', label: 'Reduced Outside Travel', desc: 'Avoided leaving the home during surge periods' },
                    { key: 'behavioral_touch_face', label: 'Avoids Touching Face', desc: 'Consciously avoids touching eyes, nose, or mouth' },
                    { key: 'behavioral_antiviral_meds', label: 'Antiviral Medications', desc: 'Has taken prescription antivirals for flu' }
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-800">{item.label}</div>
                        <div className="text-[11px] text-slate-500">{item.desc}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={data[item.key as keyof VaccineSurveyData] === 1}
                          onChange={(e) => updateField(item.key as keyof VaccineSurveyData, e.target.checked ? 1 : 0)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 4: Demographics & Household Characteristics */}
            {activeFormSection === 'demographics' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-base">
                    <Users className="w-5 h-5 text-teal-600" />
                    Socio-Demographic &amp; Household Background
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Demographic factors captured by the survey to model population-level disparities and access friction.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Age Group */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Age Bracket
                    </label>
                    <select
                      value={data.age_group}
                      onChange={(e) => updateField('age_group', e.target.value as VaccineSurveyData['age_group'])}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800"
                    >
                      <option value="18 - 34 Years">18 - 34 Years</option>
                      <option value="35 - 44 Years">35 - 44 Years</option>
                      <option value="45 - 54 Years">45 - 54 Years</option>
                      <option value="55 - 64 Years">55 - 64 Years</option>
                      <option value="65+ Years">65+ Years</option>
                    </select>
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Education Level
                    </label>
                    <select
                      value={data.education}
                      onChange={(e) => updateField('education', e.target.value as VaccineSurveyData['education'])}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800"
                    >
                      <option value="< 12 Years">&lt; 12 Years (Did not finish high school)</option>
                      <option value="12 Years">12 Years (High School Grad)</option>
                      <option value="Some College">Some College / Vocational</option>
                      <option value="College Graduate">College Graduate</option>
                    </select>
                  </div>

                  {/* Income Level */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Income &amp; Poverty Status
                    </label>
                    <select
                      value={data.income_poverty}
                      onChange={(e) => updateField('income_poverty', e.target.value as VaccineSurveyData['income_poverty'])}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800"
                    >
                      <option value="Below Poverty">Below Poverty Line</option>
                      <option value="<= $75,000, Above Poverty">&le; $75,000, Above Poverty</option>
                      <option value="> $75,000">&gt; $75,000</option>
                    </select>
                  </div>

                  {/* Employment Status */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Employment Status
                    </label>
                    <select
                      value={data.employment_status}
                      onChange={(e) => updateField('employment_status', e.target.value as VaccineSurveyData['employment_status'])}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800"
                    >
                      <option value="Employed">Employed</option>
                      <option value="Not in Labor Force">Not in Labor Force (Retired/Homemaker)</option>
                      <option value="Unemployed">Unemployed</option>
                    </select>
                  </div>

                  {/* Sex */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Gender / Biological Sex
                    </label>
                    <select
                      value={data.sex}
                      onChange={(e) => updateField('sex', e.target.value as VaccineSurveyData['sex'])}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>

                  {/* Marital Status */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Marital Status
                    </label>
                    <select
                      value={data.marital_status}
                      onChange={(e) => updateField('marital_status', e.target.value as VaccineSurveyData['marital_status'])}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800"
                    >
                      <option value="Married">Married</option>
                      <option value="Not Married">Not Married / Single</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Prediction Scorecard, Driver Breakdown & Recommendations (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Dual Prediction Gauge Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Model Prediction Results
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                <Sparkles className="w-3 h-3 text-teal-600" />
                Tuned XGBoost Calibrated
              </span>
            </div>

            {/* Dual Score Cards */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              {/* H1N1 Vaccine Score */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
                <span className="text-xs font-medium text-slate-600 mb-1">
                  H1N1 Flu Vaccine
                </span>
                <div className="text-3xl font-black tracking-tight text-slate-900 my-1">
                  {prediction.h1n1Probability}%
                </div>
                <div className={`text-[11px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                  prediction.h1n1Probability >= 65
                    ? 'bg-emerald-100 text-emerald-800'
                    : prediction.h1n1Probability >= 40
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {prediction.h1n1Prediction === 1 ? 'Likely to Vaccinate' : 'Hesitant / Unlikely'}
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      prediction.h1n1Probability >= 65
                        ? 'bg-emerald-500'
                        : prediction.h1n1Probability >= 40
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${prediction.h1n1Probability}%` }}
                  />
                </div>
              </div>

              {/* Seasonal Flu Vaccine Score */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
                <span className="text-xs font-medium text-slate-600 mb-1">
                  Seasonal Flu Vaccine
                </span>
                <div className="text-3xl font-black tracking-tight text-slate-900 my-1">
                  {prediction.seasonalProbability}%
                </div>
                <div className={`text-[11px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                  prediction.seasonalProbability >= 65
                    ? 'bg-emerald-100 text-emerald-800'
                    : prediction.seasonalProbability >= 40
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {prediction.seasonalPrediction === 1 ? 'Likely to Vaccinate' : 'Hesitant / Unlikely'}
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      prediction.seasonalProbability >= 65
                        ? 'bg-emerald-500'
                        : prediction.seasonalProbability >= 40
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${prediction.seasonalProbability}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Sensitivity / "What-If" Levers */}
            <div className="bg-teal-50/60 rounded-xl p-3.5 border border-teal-100 mb-5">
              <div className="text-xs font-bold text-teal-900 flex items-center gap-1.5 mb-2">
                <Zap className="w-3.5 h-3.5 text-teal-600" />
                Instant "What-If" Clinical Intervention Levers:
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => updateField('doctor_recc_h1n1', data.doctor_recc_h1n1 === 1 ? 0 : 1)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    data.doctor_recc_h1n1 === 1
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {data.doctor_recc_h1n1 === 1 ? '✓ Doctor Rec Given' : '+ Add Doctor Recommendation'}
                </button>
                <button
                  onClick={() => updateField('opinion_h1n1_sick_from_vacc', data.opinion_h1n1_sick_from_vacc > 2 ? 1 : 4)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    data.opinion_h1n1_sick_from_vacc <= 2
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {data.opinion_h1n1_sick_from_vacc <= 2 ? '✓ Safety Reassured' : 'Relieve Side-Effect Fear'}
                </button>
                <button
                  onClick={() => updateField('health_insurance', data.health_insurance === 1 ? 0 : 1)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    data.health_insurance === 1
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {data.health_insurance === 1 ? '✓ Insured' : '+ Provide Free Coverage'}
                </button>
              </div>
            </div>

            {/* Feature Attribution (SHAP-Like Waterfall Drivers) */}
            <div className="space-y-3 mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                Key Drivers for this Specific Profile:
              </h4>

              {prediction.positiveDrivers.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    Catalysts Increasing Uptake (+):
                  </div>
                  {prediction.positiveDrivers.slice(0, 3).map((driver, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs bg-emerald-50/50 p-2 rounded-lg border border-emerald-100"
                    >
                      <span className="font-medium text-emerald-950 truncate">{driver.factor}</span>
                      <span className="font-bold text-emerald-700 shrink-0 ml-2">{driver.impact}</span>
                    </div>
                  ))}
                </div>
              )}

              {prediction.negativeDrivers.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-semibold text-rose-800 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                    Barriers Dampening Uptake (-):
                  </div>
                  {prediction.negativeDrivers.slice(0, 3).map((driver, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs bg-rose-50/50 p-2 rounded-lg border border-rose-100"
                    >
                      <span className="font-medium text-rose-950 truncate">{driver.factor}</span>
                      <span className="font-bold text-rose-700 shrink-0 ml-2">{driver.impact}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tailored Public Health Recommendations */}
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Tailored Healthcare Provider Action Plan:
              </h4>
              <ul className="space-y-2">
                {prediction.recommendations.map((rec, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 leading-relaxed"
                  >
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
