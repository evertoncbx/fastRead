import React, { useState, useEffect, useRef } from 'react';
import { audio } from '../../services/audioService';

interface CountdownOverlayProps {
  isActive: boolean;
  onComplete: () => void;
  title?: string;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({
  isActive,
  onComplete,
  title
}) => {
  const [count, setCount] = useState<number>(3);
  const [phase, setPhase] = useState<'counting' | 'go' | 'done'>('counting');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      setCount(3);
      setPhase('counting');
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setCount(3);
    setPhase('counting');
    audio.playCountdownTick(3);

    let current = 3;

    timerRef.current = window.setInterval(() => {
      current--;
      if (current > 0) {
        setCount(current);
        audio.playCountdownTick(current);
      } else if (current === 0) {
        setPhase('go');
        audio.playCountdownGo();
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setPhase('done');
        onComplete();
      }
    }, 850);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  if (!isActive || phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex flex-col items-center justify-center p-8 text-center select-none">
        {title && (
          <span className="text-sm font-black uppercase tracking-widest text-[#D7FFB8] mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            {title}
          </span>
        )}

        <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white border-4 border-b-8 border-[#58CC02] shadow-2xl transition-transform duration-300 transform scale-100 animate-pulse">
          {phase === 'counting' ? (
            <span
              key={count}
              className="text-7xl sm:text-8xl font-black font-mono text-[#58CC02] drop-shadow-sm transition-all animate-in zoom-in-50 duration-200"
            >
              {count}
            </span>
          ) : (
            <div className="flex flex-col items-center animate-in zoom-in-75 duration-150">
              <span className="text-5xl sm:text-6xl font-black text-[#58CC02] tracking-tight">
                VAI!
              </span>
              <span className="text-2xl mt-1">🚀</span>
            </div>
          )}
        </div>

        <p className="text-lg font-black text-white/90 mt-6 tracking-wide drop-shadow-sm">
          {phase === 'counting' ? 'Prepare os olhos...' : 'Foco total!'}
        </p>
      </div>
    </div>
  );
};
