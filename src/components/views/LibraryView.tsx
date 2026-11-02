import React, { useState } from 'react';
import { BookOpen, Zap, Trophy, Award, Layers, Plus, FileText, X } from 'lucide-react';
import { ReadingText, ExerciseType } from '../../types';
import { READING_LIBRARY } from '../../data/texts';

interface LibraryViewProps {
  onSelectTextForExercise: (text: ReadingText, exerciseType: ExerciseType) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onSelectTextForExercise }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customTextContent, setCustomTextContent] = useState<string>('');

  const filtered = selectedCategory === 'todos'
    ? READING_LIBRARY
    : READING_LIBRARY.filter(t => t.category === selectedCategory);

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
    <div className="space-y-4 p-4 pb-24 max-w-lg mx-auto text-stone-800">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-stone-900 tracking-tight">Biblioteca Nacional PT-BR</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5">Obras clássicas e ensaios de cognição</p>
        </div>

        <button
          onClick={() => setShowCustomModal(true)}
          className="flex items-center gap-2 py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-xs border-b-2 border-emerald-800 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Colar Texto</span>
        </button>
      </div>

      {/* Filtros de Categoria */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none">
        {[
          { id: 'todos', label: 'Todos' },
          { id: 'conto', label: 'Contos Clássicos' },
          { id: 'artigo', label: 'Artigos & Cognição' },
          { id: 'discurso', label: 'Discursos Históricos' },
          { id: 'noticia', label: 'Notícias & Ciência' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`py-2 px-3.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-xs border-b-2 border-emerald-800'
                : 'bg-white text-stone-600 hover:text-stone-900 border-2 border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Lista de Textos */}
      <div className="space-y-3.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border-2 border-stone-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 hover:border-emerald-400 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {item.category}
                </span>
                <span className="text-xs text-stone-500 font-mono font-semibold">
                  {item.wordCount} palavras • ~{item.estimatedMinutes} min
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900">{item.title}</h3>
              <p className="text-xs sm:text-sm text-stone-500 font-medium italic mt-0.5">Autor: {item.author}</p>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>

            {/* Ações de Leitura Dinâmica para esta obra */}
            <div className="pt-3 border-t-2 border-stone-100 flex flex-wrap gap-2">
              <button
                onClick={() => onSelectTextForExercise(item, 'rsvp')}
                className="py-2 px-3 rounded-xl bg-stone-50 hover:bg-blue-50 border-2 border-stone-200 hover:border-blue-300 text-xs sm:text-sm font-bold text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trophy className="w-4 h-4" />
                <span>Leitor RSVP</span>
              </button>

              <button
                onClick={() => onSelectTextForExercise(item, 'metronome')}
                className="py-2 px-3 rounded-xl bg-stone-50 hover:bg-emerald-50 border-2 border-stone-200 hover:border-emerald-300 text-xs sm:text-sm font-bold text-emerald-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Metrônomo</span>
              </button>

              <button
                onClick={() => onSelectTextForExercise(item, 'chunking')}
                className="py-2 px-3 rounded-xl bg-stone-50 hover:bg-teal-50 border-2 border-stone-200 hover:border-teal-300 text-xs sm:text-sm font-bold text-teal-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>Em Blocos</span>
              </button>

              {item.quiz && item.quiz.length > 0 && (
                <button
                  onClick={() => onSelectTextForExercise(item, 'assessment')}
                  className="py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 text-xs sm:text-sm font-bold text-purple-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Teste + Quiz</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal para Colar Texto Próprio */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-stone-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-stone-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                Treinar com Texto Próprio
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="p-1 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-stone-600 font-bold block mb-1.5">
                Título do Artigo / Matéria
              </label>
              <input
                type="text"
                placeholder="Ex: Artigo de Trabalho / Notícia"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl py-3 px-4 text-sm sm:text-base text-stone-900 font-medium focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-stone-600 font-bold block mb-1.5">
                Conteúdo do Texto
              </label>
              <textarea
                rows={6}
                placeholder="Cole aqui o texto que você deseja ler de forma dinâmica..."
                value={customTextContent}
                onChange={(e) => setCustomTextContent(e.target.value)}
                className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 text-sm sm:text-base text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-600 font-sans font-medium transition-colors"
              />
            </div>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-stone-600 font-bold block mb-2.5">
                Escolha o modo de treinamento:
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  disabled={!customTextContent.trim()}
                  onClick={() => handleStartCustomText('rsvp')}
                  className="py-3 px-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm border-b-2 border-blue-800 transition-all cursor-pointer active:scale-98"
                >
                  <Trophy className="w-4 h-4" />
                  <span>RSVP</span>
                </button>

                <button
                  disabled={!customTextContent.trim()}
                  onClick={() => handleStartCustomText('metronome')}
                  className="py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm border-b-2 border-emerald-800 transition-all cursor-pointer active:scale-98"
                >
                  <Zap className="w-4 h-4" />
                  <span>Metrônomo</span>
                </button>

                <button
                  disabled={!customTextContent.trim()}
                  onClick={() => handleStartCustomText('chunking')}
                  className="py-3 px-3 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm border-b-2 border-teal-800 transition-all cursor-pointer active:scale-98"
                >
                  <Layers className="w-4 h-4" />
                  <span>Blocos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
