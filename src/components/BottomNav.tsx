import React from 'react';
import { Home, CalendarCheck2, Dumbbell, BookOpen, TrendingUp } from 'lucide-react';

export type NavTab = 'dashboard' | 'journey' | 'exercises' | 'library' | 'progress';

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  dailyDoneCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab, dailyDoneCount = 0 }) => {
  const tabs = [
    { id: 'dashboard' as NavTab, label: 'Início', icon: Home },
    { id: 'journey' as NavTab, label: 'Jornada', icon: CalendarCheck2, badge: dailyDoneCount > 0 ? `${dailyDoneCount}/5` : undefined },
    { id: 'exercises' as NavTab, label: 'Treino', icon: Dumbbell },
    { id: 'library' as NavTab, label: 'Textos', icon: BookOpen },
    { id: 'progress' as NavTab, label: 'Evolução', icon: TrendingUp },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-stone-200 shadow-lg px-2 py-2 pb-safe">
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all relative cursor-pointer ${
                isActive
                  ? 'text-emerald-700 font-black'
                  : 'text-stone-500 hover:text-stone-800 font-semibold'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 transition-transform ${isActive ? 'scale-110 text-emerald-700' : 'text-stone-500'}`} />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-3.5 bg-emerald-600 text-white text-xs font-black px-1.5 py-0.2 rounded-full font-mono border border-white shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 tracking-tight ${isActive ? 'font-black' : 'font-semibold'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
