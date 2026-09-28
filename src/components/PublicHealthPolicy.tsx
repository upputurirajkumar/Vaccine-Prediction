import React from 'react';
import { ShieldCheck, Stethoscope, AlertTriangle, Lightbulb, Users, Target, ArrowRight } from 'lucide-react';

export const PublicHealthPolicy: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Strategic Decision Support for Policymakers & Health Systems</span>
        </div>
        <h2 className="text-xl font-bold text-white">
          Public Health Policy & Campaign Blueprint
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Based on the predictive insights and feature attribution learned from 26,707 respondents in the 2009 National Flu Survey, the following data-driven strategic pillars will maximize community vaccination coverage.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pillar 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-teal-400 mb-2">
              <Stethoscope className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">1. EHR Physician Clinical Prompts</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              <strong>Finding:</strong> Doctor recommendation accounts for <strong>24.8%</strong> of predictive decision weight. Without it, patient uptake hovers at 13%; with a direct recommendation, it exceeds 54%.
            </p>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-1.5 text-slate-300">
              <div className="font-semibold text-teal-300">Action Plan:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Integrate mandatory Electronic Health Record (EHR) advisory alerts for all primary care checkups.</li>
                <li>Train outpatient clinic staff to frame the flu shot as standard routine care rather than an optional addon.</li>
                <li>Equip clinicians with 30-second rebuttal scripts for hesitant patients.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">2. Myth-Busting Reactogenicity Campaigns</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              <strong>Finding:</strong> Fear of getting sick from the vaccine (<code className="text-teal-400">opinion_sick_from_vacc</code>) is the primary driver of refusal among moderate-risk demographics.
            </p>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-1.5 text-slate-300">
              <div className="font-semibold text-emerald-300">Action Plan:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Disseminate clear scientific explanations differentiating mild immune response from actual influenza virus infection.</li>
                <li>Emphasize that inactivated influenza vaccines cannot transmit or cause influenza.</li>
                <li>Deploy peer testimonials featuring community healthcare champions and trusted local leaders.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 mb-2">
              <Target className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">3. Zero-Friction Community Access</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              <strong>Finding:</strong> Uninsured status reduces vaccination propensity by over <strong>16%</strong>, compounding logistical transport hurdles in non-metropolitan areas.
            </p>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-1.5 text-slate-300">
              <div className="font-semibold text-amber-300">Action Plan:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Organize zero-cost walk-in vaccination drives at commercial retail pharmacies, grocery stores, and transit hubs.</li>
                <li>Provide employer tax incentives for on-site workplace vaccination clinics during paid working hours.</li>
                <li>Send mobile vaccination vans to low-income rural and suburban census tracts.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-sky-400 mb-2">
              <Users className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">4. Cocooning Strategy & Youth Outreach</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              <strong>Finding:</strong> Young adults aged 18-34 exhibit the lowest perceived risk (&lt;28% uptake), while parents of infants under 6 months show 76%+ willingness to protect vulnerable dependents.
            </p>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-1.5 text-slate-300">
              <div className="font-semibold text-sky-300">Action Plan:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Reframe youth messaging around social responsibility and protecting immunocompromised family members (altruism appeal).</li>
                <li>Implement maternity ward postpartum vaccination protocols for new parents and close caregivers before discharge.</li>
                <li>Mandate or strongly incentivize college campus vaccination check-ins at fall matriculation.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
