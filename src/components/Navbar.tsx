import React from 'react';
import { Activity, BarChart3, Sliders, Database, ShieldAlert, Users } from 'lucide-react';

export type TabType = 'predictor' | 'benchmarks' | 'features' | 'eda' | 'batch' | 'policy';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onExportReport?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onExportReport }) => {
  const navItems: Array<{ id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'predictor', label: 'Vaccine Predictor', icon: Activity },
    { id: 'benchmarks', label: '9 ML Models Benchmark', icon: BarChart3 },
    { id: 'features', label: 'Feature Importance', icon: Sliders },
    { id: 'eda', label: 'Dataset & EDA (26.7k)', icon: Database },
    { id: 'batch', label: 'Cohort Simulator', icon: Users },
    { id: 'policy', label: 'Public Health Policy', icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20 text-white font-bold text-lg">
              💉
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-teal-300 via-emerald-200 to-white bg-clip-text text-transparent">
                  VaxPredict ML
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 font-medium">
                  XGBoost 83.9%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                PRCP-1014 Vaccine Uptake Machine Learning Analytics
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges & Export */}
          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>26,707 Records</span>
            </div>
            <div className="hidden sm:block px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300">
              ROC-AUC: <span className="text-teal-400 font-semibold">0.8357</span>
            </div>
            {onExportReport && (
              <button
                onClick={onExportReport}
                className="px-3 py-1 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border border-teal-500/40 text-xs font-sans font-medium transition cursor-pointer"
              >
                Export Report
              </button>
            )}
          </div>
        </div>

        {/* Nav Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-800/60 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm shadow-teal-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
