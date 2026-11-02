import React, { useState } from 'react';
import { BookOpen, Zap, Trophy, Award, Layers, Plus, FileText } from 'lucide-react';
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
          <h2 className="text-lg font-black text-stone-900">Biblioteca Nacional PT-BR</h2>
          <p className="text-xs text-stone-500">Obras clássicas em domínio público e ensaios de cognição</p>
        </div>

        <button
          onClick={() => setShowCustomModal(true)}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Colar Texto</span>
        </button>
      </div>

      {/* Filtros de Categoria */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
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
            className={`py-1.5 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Lista de Textos */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs space-y-3"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {item.category}
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  {item.wordCount} palavras • ~{item.estimatedMinutes} min
                </span>
              </div>
              <h3 className="text-sm font-bold text-stone-900">{item.title}</h3>
              <p className="text-xs text-stone-500 italic mt-0.5">Autor: {item.author}</p>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Ações de Leitura Dinâmica para esta obra */}
            <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-1.5">
              <button
                onClick={() => onSelectTextForExercise(item, 'rsvp')}
                className="py-1.5 px-2.5 rounded-lg bg-stone-50 hover:bg-blue-50 border border-stone-200 hover:border-blue-300 text-[11px] font-semibold text-blue-700 flex items-center gap-1 transition-colors"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Leitor RSVP</span>
              </button>

              <button
                onClick={() => onSelectTextForExercise(item, 'metronome')}
                className="py-1.5 px-2.5 rounded-lg bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 text-[11px] font-semibold text-emerald-700 flex items-center gap-1 transition-colors"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Metrônomo</span>
              </button>

              <button
                onClick={() => onSelectTextForExercise(item, 'chunking')}
                className="py-1.5 px-2.5 rounded-lg bg-stone-50 hover:bg-teal-50 border border-stone-200 hover:border-teal-300 text-[11px] font-semibold text-teal-700 flex items-center gap-1 transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Em Blocos</span>
              </button>

              {item.quiz && item.quiz.length > 0 && (
                <button
                  onClick={() => onSelectTextForExercise(item, 'assessment')}
                  className="py-1.5 px-2.5 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[11px] font-semibold text-purple-700 flex items-center gap-1 transition-colors"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Teste + Quiz</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal para Colar Texto Próprio */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl max-w-md w-full p-5 shadow-2xl space-y-4 text-stone-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                Treinar com Texto Próprio
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-stone-400 hover:text-stone-700 text-xs"
              >
                Cancelar
              </button>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                Título do Artigo / Matéria
              </label>
              <input
                type="text"
                placeholder="Ex: Artigo de Trabalho / Notícia"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                Conteúdo do Texto
              </label>
              <textarea
                rows={6}
                placeholder="Cole aqui o texto que você deseja ler de forma dinâmica..."
                value={customTextContent}
                onChange={(e) => setCustomTextContent(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-emerald-500 font-sans"
              />
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-stone-500 font-medium block mb-2">
                Escolha o modo de treinamento:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  disabled={!customTextContent.trim()}
                  onClick={() => handleStartCustomText('rsvp')}
                  className="py-2.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>RSVP</span>
                </button>

                <button
                  disabled={!customTextContent.trim()}
                  onClick={() => handleStartCustomText('metronome')}
                  className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Metrônomo</span>
                </button>

                <button
                  disabled={!customTextContent.trim()}
                  onClick={() => handleStartCustomText('chunking')}
                  className="py-2.5 px-2 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5" />
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
