import React, { useState } from 'react';
import { Zap, Trophy, Layers, Plus } from 'lucide-react';
import { ReadingText, ExerciseType } from '../../types';
import { READING_LIBRARY } from '../../data/texts';

interface LibraryViewProps {
  onSelectTextForExercise: (text: ReadingText, exerciseType: ExerciseType) => void;
  libraryTexts?: ReadingText[];
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onSelectTextForExercise, libraryTexts = READING_LIBRARY }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customTextContent, setCustomTextContent] = useState<string>('');

  const filtered = selectedCategory === 'todos'
    ? libraryTexts
    : libraryTexts.filter(t => t.category === selectedCategory);

  const handleStartCustomText = (type: ExerciseType) => {
    if (!customTextContent.trim()) return;
    const wordCount = customTextContent.trim().split(/\s+/).length;
    const customObj: ReadingText = {
      id: 'custom-' + Date.now(),
      title: customTitle.trim() || 'Texto Personalizado',
      author: 'Meu Texto',
      category: 'artigo',
      description: 'Texto inserido pelo usuário para treinamento',
      wordCount,
      estimatedMinutes: Math.max(1, Math.round(wordCount / 250)),
      text: customTextContent.trim()
    };
    setShowCustomModal(false);
    onSelectTextForExercise(customObj, type);
  };

  return (
    <div className="space-y-5 p-4 pb-32 max-w-lg mx-auto text-[#131F24]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-[#131F24] tracking-tight">Biblioteca</h2>
          <p className="text-base font-bold text-stone-500 mt-1">{libraryTexts.length} textos para treinar</p>
        </div>

        <button
          onClick={() => setShowCustomModal(true)}
          className="btn-duo-green py-3 px-4 text-sm sm:text-base font-black flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Colar Texto</span>
        </button>
      </div>

      {/* Filtros em Botões Táteis */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'todos', label: 'Todos' },
          { id: 'noticia', label: 'Notícias' },
          { id: 'conto', label: 'Contos' },
          { id: 'artigo', label: 'Artigos' },
          { id: 'discurso', label: 'Discursos' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`py-2 px-4 rounded-2xl text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#58CC02] border-b-4 border-[#46A302] text-white'
                : 'btn-duo-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Lista de Textos - Limpa, sem parágrafos de poluição */}
      <div className="space-y-3.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="card-duo p-5 sm:p-6 space-y-3 hover:border-[#1CB0F6] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#46A302] bg-[#D7FFB8] px-3 py-0.5 rounded-full border border-[#A8EE69]">
                  {item.category}
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-400 font-mono">
                  {item.wordCount} palavras • ~{item.estimatedMinutes} min
                </span>
              </div>
              <h3 className="text-xl font-black text-[#131F24] leading-snug">{item.title}</h3>
              <p className="text-sm font-bold text-stone-400 mt-0.5">{item.author}</p>
            </div>

            {/* Treinar este texto com um clique */}
            <div className="pt-3 border-t-2 border-stone-100 flex items-center justify-end gap-2">
              <span className="text-xs sm:text-sm font-black text-stone-400 mr-auto">Treinar:</span>
              <button
                onClick={() => onSelectTextForExercise(item, 'metronome')}
                className="btn-duo-white py-2 px-3.5 text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#58CC02]" />
                <span>Metrônomo</span>
              </button>
              <button
                onClick={() => onSelectTextForExercise(item, 'rsvp')}
                className="btn-duo-blue py-2 px-3.5 text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer"
              >
                <Trophy className="w-4 h-4" />
                <span>RSVP</span>
              </button>
              <button
                onClick={() => onSelectTextForExercise(item, 'chunking')}
                className="btn-duo-purple py-2 px-3.5 text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>Blocos</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Texto Personalizado */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-stone-200 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-2xl font-black text-[#131F24]">Colar Meu Próprio Texto</h3>
              <p className="text-sm font-bold text-stone-400 mt-1">Treine qualquer notícia, apostila ou relatório</p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="text-xs sm:text-sm font-black uppercase text-stone-400 block mb-1">Título do Texto</label>
                <input
                  type="text"
                  placeholder="Ex: Artigo de Inteligência Artificial"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-stone-200 focus:border-[#58CC02] outline-none text-base font-bold"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-black uppercase text-stone-400 block mb-1">Conteúdo</label>
                <textarea
                  rows={6}
                  placeholder="Cole aqui o texto que você deseja praticar..."
                  value={customTextContent}
                  onChange={(e) => setCustomTextContent(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-stone-200 focus:border-[#58CC02] outline-none text-base font-medium resize-none leading-relaxed font-reading"
                />
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setShowCustomModal(false)}
                className="flex-1 py-3.5 btn-duo-white text-base font-black cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleStartCustomText('rsvp')}
                disabled={!customTextContent.trim()}
                className="flex-1 py-3.5 btn-duo-green text-base font-black disabled:opacity-40 cursor-pointer"
              >
                Treinar no RSVP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
