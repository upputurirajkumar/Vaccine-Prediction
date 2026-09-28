import React, { useState } from 'react';
import { RespondentFeatures } from '../types/vaccine';
import { SAMPLE_PERSONAS } from '../data/samplePersonas';
import { 
  Stethoscope, 
  ShieldCheck, 
  Sparkles, 
  User, 
  AlertCircle, 
  RotateCcw, 
  HelpCircle,
  Activity,
  HeartHandshake
} from 'lucide-react';

interface PredictorFormProps {
  features: RespondentFeatures;
  onChange: (newFeatures: RespondentFeatures) => void;
  onReset: () => void;
  onLoadPersona: (personaId: string) => void;
}

export const PredictorForm: React.FC<PredictorFormProps> = ({
  features,
  onChange,
  onReset,
  onLoadPersona,
}) => {
  const [activeSection, setActiveSection] = useState<'clinical' | 'beliefs' | 'behaviors' | 'demographics'>('clinical');

  const updateField = <K extends keyof RespondentFeatures>(field: K, value: RespondentFeatures[K]) => {
    onChange({
      ...features,
      [field]: value,
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      {/* Header and Persona Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-400" />
            Respondent Profile Configuration
          </h2>
          <p className="text-xs text-slate-400">
            Tune medical, psychological, and demographic factors to assess probability
          </p>
        </div>

        <button
          onClick={onReset}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700/60 hover:bg-slate-800 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Persona Presets Chips */}
      <div className="mt-4">
        <label className="text-xs font-semibold text-slate-300 block mb-2">
          Load Pre-configured Persona:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {SAMPLE_PERSONAS.map((persona) => (
            <button
              key={persona.id}
              onClick={() => onLoadPersona(persona.id)}
              className="flex items-center space-x-2 p-2 rounded-xl border border-slate-800 bg-slate-800/40 hover:bg-slate-800 hover:border-teal-500/50 transition text-left group"
              title={persona.tagline}
            >
              <span className="text-lg">{persona.avatar}</span>
              <div className="truncate">
                <div className="text-xs font-medium text-slate-200 group-hover:text-teal-300 truncate">
                  {persona.name}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {persona.features.age_group}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick What-If Lab Toggles */}
      <div className="mt-4 p-3 rounded-xl bg-teal-950/20 border border-teal-500/20 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-teal-300 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          Quick What-If Simulation:
        </span>
        <button
          onClick={() => updateField('doctor_recc_h1n1', features.doctor_recc_h1n1 === 1 ? 0 : 1)}
          className={`text-xs px-2.5 py-1 rounded-md transition font-medium border ${
            features.doctor_recc_h1n1 === 1
              ? 'bg-teal-500 text-slate-900 border-teal-400 font-semibold'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-teal-500/50'
          }`}
        >
          {features.doctor_recc_h1n1 === 1 ? '✓ Doctor Rec H1N1: ON' : '+ Give H1N1 Doctor Rec'}
        </button>
        <button
          onClick={() => updateField('doctor_recc_seasonal', features.doctor_recc_seasonal === 1 ? 0 : 1)}
          className={`text-xs px-2.5 py-1 rounded-md transition font-medium border ${
            features.doctor_recc_seasonal === 1
              ? 'bg-teal-500 text-slate-900 border-teal-400 font-semibold'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-teal-500/50'
          }`}
        >
          {features.doctor_recc_seasonal === 1 ? '✓ Doctor Rec Seasonal: ON' : '+ Give Seasonal Doctor Rec'}
        </button>
        <button
          onClick={() => updateField('health_insurance', features.health_insurance === 1 ? 0 : 1)}
          className={`text-xs px-2.5 py-1 rounded-md transition font-medium border ${
            features.health_insurance === 1
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          {features.health_insurance === 1 ? 'Insured' : 'Uninsured'}
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-800 mt-5 space-x-2">
        <button
          onClick={() => setActiveSection('clinical')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-medium border-b-2 transition flex items-center gap-1.5 ${
            activeSection === 'clinical'
              ? 'border-teal-400 text-teal-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>1. Clinical & Medical</span>
        </button>
        <button
          onClick={() => setActiveSection('beliefs')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-medium border-b-2 transition flex items-center gap-1.5 ${
            activeSection === 'beliefs'
              ? 'border-teal-400 text-teal-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>2. Opinions & Beliefs</span>
        </button>
        <button
          onClick={() => setActiveSection('behaviors')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-medium border-b-2 transition flex items-center gap-1.5 ${
            activeSection === 'behaviors'
              ? 'border-teal-400 text-teal-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>3. Preventive Habits</span>
        </button>
        <button
          onClick={() => setActiveSection('demographics')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-medium border-b-2 transition flex items-center gap-1.5 ${
            activeSection === 'demographics'
              ? 'border-teal-400 text-teal-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>4. Demographics</span>
        </button>
      </div>

      {/* SECTION 1: Clinical & Medical */}
      {activeSection === 'clinical' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  Doctor Recommendation (H1N1)
                </span>
                <span className="text-[11px] text-teal-400">
                  Top predictor in PRCP-1014 (Importance: 24.8%)
                </span>
              </div>
              <button
                onClick={() => updateField('doctor_recc_h1n1', features.doctor_recc_h1n1 === 1 ? 0 : 1)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  features.doctor_recc_h1n1 === 1 ? 'bg-teal-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    features.doctor_recc_h1n1 === 1 ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  Doctor Recommendation (Seasonal Flu)
                </span>
                <span className="text-[11px] text-teal-400">
                  Strongest predictor for seasonal uptake
                </span>
              </div>
              <button
                onClick={() => updateField('doctor_recc_seasonal', features.doctor_recc_seasonal === 1 ? 0 : 1)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  features.doctor_recc_seasonal === 1 ? 'bg-teal-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    features.doctor_recc_seasonal === 1 ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  Healthcare Worker
                </span>
                <span className="text-[11px] text-slate-400">
                  Doctor, nurse, allied hospital employee
                </span>
              </div>
              <button
                onClick={() => updateField('health_worker', features.health_worker === 1 ? 0 : 1)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  features.health_worker === 1 ? 'bg-teal-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    features.health_worker === 1 ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  Health Insurance Coverage
                </span>
                <span className="text-[11px] text-slate-400">
                  Eliminates out-of-pocket payment barrier
                </span>
              </div>
              <button
                onClick={() => updateField('health_insurance', features.health_insurance === 1 ? 0 : 1)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  features.health_insurance === 1 ? 'bg-teal-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    features.health_insurance === 1 ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  Chronic Medical Condition
                </span>
                <span className="text-[11px] text-slate-400">
                  Asthma, heart disease, diabetes, etc.
                </span>
              </div>
              <button
                onClick={() => updateField('chronic_med_condition', features.chronic_med_condition === 1 ? 0 : 1)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  features.chronic_med_condition === 1 ? 'bg-teal-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    features.chronic_med_condition === 1 ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  Child under 6 Months in Household
                </span>
                <span className="text-[11px] text-slate-400">
                  Infants too young to receive flu shot (cocooning)
                </span>
              </div>
              <button
                onClick={() => updateField('child_under_6_months', features.child_under_6_months === 1 ? 0 : 1)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  features.child_under_6_months === 1 ? 'bg-teal-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    features.child_under_6_months === 1 ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Beliefs & Perceptions */}
      {activeSection === 'beliefs' && (
        <div className="space-y-4 mt-4">
          <p className="text-xs text-slate-400">
            Survey participants rated their beliefs on a 1 (Not at all / Very Low) to 5 (Very high / Very Effective) Likert scale:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* H1N1 Vaccine Effective */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-slate-200">
                  H1N1 Vaccine Effectiveness Belief
                </span>
                <span className="text-xs font-bold text-teal-400">
                  {features.opinion_h1n1_vacc_effective}/5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={features.opinion_h1n1_vacc_effective}
                onChange={(e) => updateField('opinion_h1n1_vacc_effective', parseInt(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1: Ineffective</span>
                <span>3: Neutral</span>
                <span>5: Very Effective</span>
              </div>
            </div>

            {/* H1N1 Risk */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-slate-200">
                  Perceived Personal Risk of H1N1 Flu
                </span>
                <span className="text-xs font-bold text-teal-400">
                  {features.opinion_h1n1_risk}/5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={features.opinion_h1n1_risk}
                onChange={(e) => updateField('opinion_h1n1_risk', parseInt(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1: Very Low Risk</span>
                <span>3: Moderate</span>
                <span>5: Very High Risk</span>
              </div>
            </div>

            {/* H1N1 Sick from Vaccine */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-slate-200">
                  Fear of Sickness from H1N1 Shot
                </span>
                <span className={`text-xs font-bold ${features.opinion_h1n1_sick_from_vacc >= 4 ? 'text-rose-400' : 'text-slate-400'}`}>
                  {features.opinion_h1n1_sick_from_vacc}/5 (Negative Driver)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={features.opinion_h1n1_sick_from_vacc}
                onChange={(e) => updateField('opinion_h1n1_sick_from_vacc', parseInt(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1: Not worried</span>
                <span>3: Somewhat</span>
                <span>5: Very Worried</span>
              </div>
            </div>

            {/* Seasonal Vaccine Effective */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-slate-200">
                  Seasonal Vaccine Effectiveness Belief
                </span>
                <span className="text-xs font-bold text-teal-400">
                  {features.opinion_seas_vacc_effective}/5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={features.opinion_seas_vacc_effective}
                onChange={(e) => updateField('opinion_seas_vacc_effective', parseInt(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1: Ineffective</span>
                <span>3: Neutral</span>
                <span>5: Very Effective</span>
              </div>
            </div>

            {/* Seasonal Risk */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-slate-200">
                  Perceived Risk of Seasonal Flu
                </span>
                <span className="text-xs font-bold text-teal-400">
                  {features.opinion_seas_risk}/5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={features.opinion_seas_risk}
                onChange={(e) => updateField('opinion_seas_risk', parseInt(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1: Very Low</span>
                <span>3: Moderate</span>
                <span>5: Very High</span>
              </div>
            </div>

            {/* Disease Concern & Knowledge */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs font-semibold text-slate-200 block mb-1">
                    Flu Concern (0-3)
                  </span>
                  <select
                    value={features.h1n1_concern}
                    onChange={(e) => updateField('h1n1_concern', parseInt(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-slate-200"
                  >
                    <option value={0}>0: Not at all concerned</option>
                    <option value={1}>1: Not very concerned</option>
                    <option value={2}>2: Somewhat concerned</option>
                    <option value={3}>3: Very concerned</option>
                  </select>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-200 block mb-1">
                    Flu Knowledge (0-2)
                  </span>
                  <select
                    value={features.h1n1_knowledge}
                    onChange={(e) => updateField('h1n1_knowledge', parseInt(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-slate-200"
                  >
                    <option value={0}>0: No knowledge</option>
                    <option value={1}>1: A little knowledge</option>
                    <option value={2}>2: A lot of knowledge</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Protective Behaviors */}
      {activeSection === 'behaviors' && (
        <div className="mt-4">
          <p className="text-xs text-slate-400 mb-3">
            Behavioral compliance features represent an individual's general health awareness & hygiene vigilance:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'behavioral_wash_hands', label: 'Frequent Hand Washing' },
              { id: 'behavioral_face_mask', label: 'Wears Face Mask' },
              { id: 'behavioral_avoidance', label: 'Avoids Symptomatic People' },
              { id: 'behavioral_large_gatherings', label: 'Avoids Large Gatherings' },
              { id: 'behavioral_outside_home', label: 'Avoids Leaving Home' },
              { id: 'behavioral_touch_face', label: 'Avoids Touching Face' },
              { id: 'behavioral_antiviral_meds', label: 'Took Antiviral Medications' },
            ].map((b) => {
              const field = b.id as keyof RespondentFeatures;
              const val = features[field] === 1;
              return (
                <button
                  key={b.id}
                  onClick={() => updateField(field, val ? 0 : 1)}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                    val
                      ? 'bg-teal-500/15 border-teal-500/40 text-teal-200'
                      : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-medium">{b.label}</span>
                  <span className={`text-[10px] mt-2 font-semibold ${val ? 'text-teal-400' : 'text-slate-500'}`}>
                    {val ? '✓ Active Habit' : '✕ Inactive'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 4: Demographics */}
      {activeSection === 'demographics' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Age Group
            </label>
            <select
              value={features.age_group}
              onChange={(e) => updateField('age_group', e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
            >
              <option value="18 - 34 Years">18 - 34 Years (Lowest seasonal uptake)</option>
              <option value="35 - 44 Years">35 - 44 Years</option>
              <option value="45 - 54 Years">45 - 54 Years</option>
              <option value="55 - 64 Years">55 - 64 Years</option>
              <option value="65+ Years">65+ Years (Highest seasonal uptake ~66%)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Education Level
            </label>
            <select
              value={features.education}
              onChange={(e) => updateField('education', e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
            >
              <option value="< 12 Years">&lt; 12 Years (High School Incomplete)</option>
              <option value="12 Years">12 Years (High School Graduate)</option>
              <option value="Some College">Some College</option>
              <option value="College Graduate">College Graduate</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Income / Poverty Threshold
            </label>
            <select
              value={features.income_poverty}
              onChange={(e) => updateField('income_poverty', e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
            >
              <option value="<= $75,000, Above Poverty">&lt;= $75,000, Above Poverty</option>
              <option value="> $75,000">&gt; $75,000</option>
              <option value="Below Poverty">Below Poverty</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Employment Status
            </label>
            <select
              value={features.employment_status}
              onChange={(e) => updateField('employment_status', e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
            >
              <option value="Employed">Employed</option>
              <option value="Not in Labor Force">Not in Labor Force (Retired/Homemaker)</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Marital Status
            </label>
            <select
              value={features.marital_status}
              onChange={(e) => updateField('marital_status', e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
            >
              <option value="Married">Married</option>
              <option value="Not Married">Not Married</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Housing Tenancy
            </label>
            <select
              value={features.rent_or_own}
              onChange={(e) => updateField('rent_or_own', e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
            >
              <option value="Own">Own Home</option>
              <option value="Rent">Rent</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
