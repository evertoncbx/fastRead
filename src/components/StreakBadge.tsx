import React from 'react';
import { Flame, FlameKindling } from 'lucide-react';

interface StreakBadgeProps {
  streakDays: number;
  size?: 'sm' | 'md' | 'lg';
  showDaysSuffix?: boolean;
  onClick?: () => void;
  className?: string;
  title?: string;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({
  streakDays,
  size = 'md',
  showDaysSuffix = false,
  onClick,
  className = '',
  title
}) => {
  const isLit = streakDays > 0;

  // Tamanhos dos ícones e textos
  const sizeClasses = {
    sm: {
      container: 'px-2 py-1 text-xs gap-1 rounded-xl',
      icon: 'w-3.5 h-3.5 sm:w-4 sm:h-4',
      num: 'text-xs font-black'
    },
    md: {
      container: 'px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-base gap-1 sm:gap-1.5 rounded-xl sm:rounded-2xl',
      icon: 'w-4 h-4 sm:w-5 sm:h-5',
      num: 'text-xs sm:text-base font-black'
    },
    lg: {
      container: 'px-3 sm:px-4 py-1.5 sm:py-2 text-base sm:text-lg gap-2 rounded-2xl',
      icon: 'w-5 h-5 sm:w-6 sm:h-6',
      num: 'text-base sm:text-lg font-black'
    }
  }[size];

  // Estilos de chama acesa vs apagada estilo Duolingo/Busuu
  const themeClasses = isLit
    ? 'bg-[#FFF8D9] border-[#FFE680] border-b-[#E5A500] text-[#B8860B] shadow-xs'
    : 'bg-stone-100 border-stone-200 border-b-stone-300 text-stone-400 opacity-90';

  const interactiveClasses = onClick
    ? 'cursor-pointer hover:brightness-105 active:border-b-2 active:translate-y-[2px] transition-all select-none'
    : '';

  const defaultTitle = isLit
    ? `Sequência ativa: ${streakDays} ${streakDays === 1 ? 'dia' : 'dias'} seguidos! Clique para ver sua ofensiva.`
    : 'Chama apagada! Conecte-se e pratique diariamente para acender seu foguinho.';

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      title={title || defaultTitle}
      aria-label={`Sequência de dias: ${streakDays}`}
      className={`flex items-center border-2 border-b-4 shrink-0 font-mono ${sizeClasses.container} ${themeClasses} ${interactiveClasses} ${className}`}
    >
      {isLit ? (
        <Flame className={`${sizeClasses.icon} fill-[#FF9600] text-[#FF9600] shrink-0 drop-shadow-xs`} />
      ) : (
        <Flame className={`${sizeClasses.icon} text-stone-400 fill-stone-200 stroke-[2] shrink-0`} />
      )}
      <span className={sizeClasses.num}>
        {streakDays}
        {showDaysSuffix ? ` ${streakDays === 1 ? 'dia' : 'dias'}` : ''}
      </span>
    </Component>
  );
};
