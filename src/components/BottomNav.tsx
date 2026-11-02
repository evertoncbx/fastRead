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
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-md px-2 py-1.5 pb-safe">
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-emerald-700 font-bold'
                  : 'text-stone-500 hover:text-stone-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-emerald-700' : 'text-stone-500'}`} />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-3.5 bg-emerald-600 text-white text-[9px] font-bold px-1 rounded-full font-mono">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1">{tab.label}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
