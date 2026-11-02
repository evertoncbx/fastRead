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
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-stone-200 px-2 py-1.5 sm:py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] overflow-hidden">
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
                  ? 'text-[#58CC02]'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1.5 rounded-2xl transition-all ${
                    isActive ? 'bg-[#D7FFB8] scale-110 shadow-xs' : ''
                  }`}
                >
                  <Icon className={`w-7 h-7 stroke-[2.5] ${isActive ? 'text-[#46A302]' : 'text-stone-400'}`} />
                </div>
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 bg-[#58CC02] text-white text-xs font-black px-2 py-0.5 rounded-full border-2 border-white shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-sm mt-1 tracking-tight ${isActive ? 'font-black text-[#46A302]' : 'font-bold'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
