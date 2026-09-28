import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Stethoscope, 
  AlertCircle, 
  DollarSign, 
  Users, 
  Activity, 
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const PublicHealthPolicyView: React.FC = () => {
  const [coverageRate, setCoverageRate] = useState<number>(45);

  // Approximate herd immunity calculations for influenza (R0 ~ 1.4 - 1.8 -> threshold ~ 35 - 55%)
  const herdImmunityThreshold = 65;
  const isProtected = coverageRate >= herdImmunityThreshold;
  const transmissionRisk = Math.max(5, Math.round((1 - coverageRate / 100) * 85));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          Public Health Interventions &amp; Policy Strategy
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Evidence-based policy frameworks derived from machine learning findings on the 26,707 CDC respondents to maximize population-wide vaccination rates.
        </p>
      </div>

      {/* Interactive Herd Immunity & Outbreak Risk Simulator */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-base">
              <Activity className="w-5 h-5 text-teal-600" />
              Community Herd Immunity &amp; Transmission Simulator
            </h3>
            <p className="text-xs text-slate-500">
              Adjust projected population vaccination rate to simulate community vulnerability.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold text-slate-600">Coverage Level:</span>
            <span className="text-base font-black text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
              {coverageRate}%
            </span>
          </div>
        </div>

        {/* Coverage Slider */}
        <div className="mb-6">
          <input
            type="range"
            min={10}
            max={90}
            step={1}
            value={coverageRate}
            onChange={(e) => setCoverageRate(Number(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer h-2.5 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1.5 font-medium">
            <span>10% (Critical Danger)</span>
            <span className="text-amber-700 font-semibold">21.2% (2009 H1N1 Actual)</span>
            <span>46.6% (2009 Seasonal Actual)</span>
            <span className="text-teal-700 font-semibold">65%+ (Target Herd Immunity)</span>
            <span>90% (Maximum Coverage)</span>
          </div>
        </div>

        {/* Simulation Result Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <span className="text-xs font-semibold text-slate-600">Herd Immunity Status</span>
            <div className={`text-xl font-bold my-1 flex items-center justify-center gap-1.5 ${
              isProtected ? 'text-emerald-700' : 'text-amber-700'
            }`}>
              {isProtected ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Achieved (&ge;65%)
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  Sub-Optimal
                </>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              {isProtected ? 'Community transmission effectively broken' : `${herdImmunityThreshold - coverageRate}% additional coverage needed`}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <span className="text-xs font-semibold text-slate-600">Secondary Transmission Risk</span>
            <div className="text-xl font-bold text-slate-900 my-1">
              {transmissionRisk}%
            </div>
            <p className="text-[11px] text-slate-500">
              Estimated probability of outbreak in high-density venues
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <span className="text-xs font-semibold text-slate-600">Vulnerable Cohort Shielding</span>
            <div className="text-xl font-bold text-teal-700 my-1">
              {Math.min(98, Math.round(coverageRate * 1.15))}%
            </div>
            <p className="text-[11px] text-slate-500">
              Protection extended to infants &amp; immunosuppressed
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars of Policy Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 mb-2">
              1. Primary Care Physician Recommendation Mandate
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              With physician recommendation multiplying vaccine uptake probability by over 8-fold, public health authorities should embed automated clinical prompts into Electronic Health Record (EHR) systems reminding doctors to verbally advise flu shots during routine autumn visits.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-teal-700 flex items-center gap-1">
            <span>High Impact Lever: +30-35% potential uptake</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 mb-2">
              2. Proactive Side-Effect Demystification
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fear of getting sick from the vaccine was the single largest negative barrier in the model. Informational campaigns must contrast mild transient injection-site discomfort with acute influenza morbidity, hospitalization risk, and viral transmission to infants.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-amber-700 flex items-center gap-1">
            <span>Hesitancy Neutralizer: Reclaims 15-20% skeptical users</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 mb-2">
              3. Zero Co-Pay &amp; Walk-In Mobile Access
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Uninsured individuals displayed significantly reduced vaccination rates due to friction and perceived cost. Expanding community health clinic vouchers, employer-hosted mobile clinics, and pharmacy walk-ins removes structural equity barriers.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-indigo-700 flex items-center gap-1">
            <span>Equity Driver: Protects lower-income &amp; uninsured cohorts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 mb-2">
              4. Cocooning &amp; Vulnerable Population Shielding
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prioritize outreach to households with infants under 6 months (who cannot receive flu vaccines) and individuals with chronic medical conditions. Promoting "cocooning" (immunizing caregivers to shield infants) strongly boosts parental compliance.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <span>Mortality Reduction: Shields fragile clinical cohorts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
