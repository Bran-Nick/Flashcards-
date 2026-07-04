import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Tag, Eye, ShieldAlert } from 'lucide-react';
import { useCardStore } from '../store';
import type { CardDifficulty } from '../types';
import { usePageTitle } from '../../../hooks/usePageTitle';
import PageHeader from '../../../components/PageHeader';
import PageShell from '../../../components/PageShell';
import '../styles/card-form.css';

export default function CardForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  usePageTitle(isEditing ? 'Editar tarjeta' : 'Crear tarjeta');

  const cards = useCardStore((state) => state.cards);
  const addCard = useCardStore((state) => state.addCard);
  const editCard = useCardStore((state) => state.editCard);

  const card = (cards || []).find((c) => c.id === id);

  const [question, setQuestion] = useState(card?.question || '');
  const [answer, setAnswer] = useState(card?.answer || '');
  const [topic, setTopic] = useState(card?.topic || '');
  const [difficulty, setDifficulty] = useState<CardDifficulty>(card?.difficulty || 'medium');
  const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');

  // Reset/adjust state when the id changes (to support transitions between different card edits or new mode)
  const [prevId, setPrevId] = useState(id);
  if (id !== prevId) {
    setPrevId(id);
    setQuestion(card?.question || '');
    setAnswer(card?.answer || '');
    setTopic(card?.topic || '');
    setDifficulty(card?.difficulty || 'medium');
  }

   if (isEditing && !card) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center" role="alert">
        <ShieldAlert aria-hidden="true" className="text-rose-500 h-12 w-12 mb-4" />
        <h3 className="text-xl font-bold">Tarjeta no encontrada</h3>
        <p className="text-slate-400 mt-2">La tarjeta con ID "{id}" no existe en el store.</p>
        <Link
          to="/cards"
          className="text-violet-400 hover:underline mt-4 flex items-center gap-1.5 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-lg"
        >
          <ArrowLeft aria-hidden="true" size={16} /> Volver al Listado
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim() || !topic.trim()) return;

    const cardData = {
      question: question.trim(),
      answer: answer.trim(),
      topic: topic.trim(),
      difficulty,
    };

    if (isEditing && card) {
      editCard(card.id, cardData);
    } else {
      addCard(cardData);
    }

    navigate('/cards');
  };

  const difficultyColors = {
    easy: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
    medium: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
    hard: 'text-rose-400 border-rose-500/30 bg-rose-500/5',
  };

  const difficultyLabels = {
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
  };

  return (
    <PageShell size="default">
      <PageHeader
        title={isEditing ? 'Editar Tarjeta' : 'Crear Nueva Tarjeta'}
        subtitle={
          isEditing
            ? 'Actualiza los campos de tu tarjeta para modificar tu mazo.'
            : 'Define una pregunta y una respuesta para guardar en tu biblioteca.'
        }
        backTo="/cards"
        mobileSubtitle={null}
        backLabel="Volver al listado"
      />

      <form onSubmit={handleSubmit} className="mobile-card-form md:hidden space-y-5" aria-label={isEditing ? 'Editar tarjeta' : 'Crear tarjeta'}>
        <div className="space-y-3">
          <div className="mobile-preview-toolbar flex items-center justify-between gap-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 normal-case tracking-normal text-slate-400">
              <Eye aria-hidden="true" size={14} />
              Selecciona una opción
            </span>

            <div className="mobile-side-toggle flex bg-slate-900 rounded-lg p-0.5 border border-slate-800" role="group" aria-label="Seleccionar lado de la tarjeta">
              <button
                type="button"
                onClick={() => setPreviewSide('front')}
                aria-pressed={previewSide === 'front'}
                className={`mobile-side-toggle-button px-3 py-1 rounded-md text-[10px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 motion-reduce:transition-none ${previewSide === 'front'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                Pregunta
              </button>

              <button
                type="button"
                onClick={() => setPreviewSide('back')}
                aria-pressed={previewSide === 'back'}
                className={`mobile-side-toggle-button px-3 py-1 rounded-md text-[10px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 motion-reduce:transition-none ${previewSide === 'back'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                Respuesta
              </button>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            Estás editando el lado de {previewSide === 'front' ? 'pregunta' : 'respuesta'}.
          </p>

          <div className="mobile-form-flip-card mobile-card-preview">
            <div
              className={`mobile-form-flip-inner motion-reduce:transition-none ${previewSide === 'back' ? 'is-flipped' : ''}`}
            >
              <div
                className="mobile-form-flip-face mobile-form-flip-front relative min-h-[220px] rounded-3xl border border-slate-900 bg-slate-900/10 p-5 flex flex-col justify-between shadow-xl overflow-hidden"
                aria-hidden={previewSide !== 'front'}
              >
                <div aria-hidden="true" className="absolute top-0 right-0 h-40 w-40 rounded-full bg-violet-600/5 blur-3xl" />
                <div aria-hidden="true" className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-indigo-600/5 blur-3xl" />

                <div className="flex justify-between items-center z-10">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <Tag aria-hidden="true" size={10} />
                    {topic || 'Categoría'}
                  </span>

                  <span className={`text-[9px] font-black border rounded px-1.5 py-0.5 uppercase tracking-wider ${difficultyColors[difficulty]}`}>
                    {difficultyLabels[difficulty]}
                  </span>
                </div>

                <div className="flex-1 flex items-center justify-center py-4 z-10">
                  <textarea
                    aria-label="Pregunta de la tarjeta"
                    spellCheck={false}
                    required
                    tabIndex={previewSide === 'front' ? 0 : -1}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Escribí la pregunta..."
                    className="mobile-card-textarea min-h-[100px] w-full resize-none rounded-2xl px-2 py-4 text-center text-base font-bold leading-relaxed text-slate-200 placeholder:text-slate-500 placeholder:italic focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="flex justify-between items-center text-[9px] text-slate-600 font-mono border-t border-slate-900/40 pt-3 z-10">
                  <span>{isEditing ? `ID: ${card?.id.split('-').pop()}` : 'Tarjeta Nueva'}</span>
                  <span>Pregunta</span>
                </div>
              </div>

              <div
                className="mobile-form-flip-face mobile-form-flip-back relative min-h-[220px] rounded-3xl border border-slate-900 bg-slate-900/10 p-5 flex flex-col justify-between shadow-xl overflow-hidden"
                aria-hidden={previewSide !== 'back'}
              >
                <div aria-hidden="true" className="absolute top-0 right-0 h-40 w-40 rounded-full bg-violet-600/5 blur-3xl" />
                <div aria-hidden="true" className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-indigo-600/5 blur-3xl" />

                <div className="flex justify-between items-center z-10">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <Tag aria-hidden="true" size={10} />
                    {topic || 'Categoría'}
                  </span>

                  <span className={`text-[9px] font-black border rounded px-1.5 py-0.5 uppercase tracking-wider ${difficultyColors[difficulty]}`}>
                    {difficultyLabels[difficulty]}
                  </span>
                </div>

                <div className="flex-1 flex items-center justify-center py-4 z-10">
                  <textarea
                    aria-label="Respuesta de la tarjeta"
                    spellCheck={false}
                    required
                    tabIndex={previewSide === 'back' ? 0 : -1}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Escribí la respuesta..."
                    className="mobile-card-textarea min-h-[100px] w-full resize-none rounded-2xl px-2 py-4 text-center text-sm leading-relaxed text-slate-400 placeholder:text-slate-500 placeholder:italic focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div className="flex justify-between items-center text-[9px] text-slate-600 font-mono border-t border-slate-900/40 pt-3 z-10">
                  <span>{isEditing ? `ID: ${card?.id.split('-').pop()}` : 'Tarjeta Nueva'}</span>
                  <span>Respuesta</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <fieldset className="mobile-card-fieldset space-y-2">
          <legend className="block text-sm font-bold text-slate-400">
            Dificultad
          </legend>

          <div className="grid grid-cols-3 bg-slate-950 p-0.5 rounded-xl border border-slate-900">
            {(['easy', 'medium', 'hard'] as CardDifficulty[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                aria-pressed={difficulty === level}
                className={`py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 motion-reduce:transition-none ${difficulty === level
                    ? level === 'easy'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : level === 'medium'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : 'text-slate-500 hover:text-slate-300'
                  }`}
              >
                {difficultyLabels[level]}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mobile-card-fieldset space-y-2">
          <label htmlFor="mobile-card-topic" className="block text-sm font-bold text-slate-400">
            Tema / Categoría
          </label>

          <input
            id="mobile-card-topic"
            type="text"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ej: Programación, Hardware, Redes"
            className="w-full rounded-xl border border-slate-900 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all font-medium"
          />
        </div>

        <div className="mobile-form-actions flex justify-end gap-3 border-t border-slate-900 pt-5">
          <button
            type="button"
            onClick={() => navigate('/cards')}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-400 hover:bg-slate-900 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 motion-reduce:transition-none"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 active:bg-violet-700 transition-all shadow-lg shadow-violet-600/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 motion-reduce:transform-none motion-reduce:transition-none"
          >
            {isEditing ? 'Guardar' : 'Crear Tarjeta'}
          </button>
        </div>
      </form>

      <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-7 bg-slate-900/10 border border-slate-900 p-6 md:p-8 rounded-3xl" aria-label={isEditing ? 'Editar tarjeta' : 'Crear tarjeta'}>
          <div className="space-y-2">
            <label htmlFor="desktop-card-question" className="block text-sm font-bold text-slate-400">
              Anverso (Pregunta o Concepto)
            </label>
            <textarea
              id="desktop-card-question"
              required
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ej: ¿Qué es la inyección SQL?"
              className="w-full rounded-xl border border-slate-900 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all resize-none font-medium leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="desktop-card-answer" className="block text-sm font-bold text-slate-400">
              Reverso (Respuesta o Detalles)
            </label>
            <textarea
              id="desktop-card-answer"
              required
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Ej: Es una vulnerabilidad que permite a un atacante ejecutar sentencias SQL maliciosas..."
              className="w-full rounded-xl border border-slate-900 bg-slate-950 px-4 py-3 text-sm text-slate-300 placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all resize-none font-medium leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="desktop-card-topic" className="block text-sm font-bold text-slate-400">
                Tema / Categoría
              </label>
              <input
                id="desktop-card-topic"
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ej: Programación, Hardware, Redes"
                className="w-full rounded-xl border border-slate-900 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all font-medium"
              />
            </div>

            <fieldset className="space-y-2">
              <legend className="block text-sm font-bold text-slate-400">
                Dificultad
              </legend>

              <div className="grid grid-cols-3 bg-slate-950 p-1 rounded-xl border border-slate-900">
                {(['easy', 'medium', 'hard'] as CardDifficulty[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    aria-pressed={difficulty === level}
                    className={`py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 motion-reduce:transition-none ${difficulty === level
                        ? level === 'easy'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : level === 'medium'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'text-slate-500 hover:text-slate-300'
                      }`}
                  >
                    {difficultyLabels[level]}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-900 pt-6">
            <button
              type="button"
              onClick={() => navigate('/cards')}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-400 hover:bg-slate-900 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 motion-reduce:transition-none"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 active:bg-violet-700 transition-all shadow-lg shadow-violet-600/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 motion-reduce:transform-none motion-reduce:transition-none"
            >
              {isEditing ? 'Guardar Cambios' : 'Crear Tarjeta'}
            </button>
          </div>
        </form>

        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Eye aria-hidden="true" size={14} /> Vista Previa de Tarjeta
            </span>

            <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800" role="group" aria-label="Seleccionar lado de vista previa">
              <button
                type="button"
                onClick={() => setPreviewSide('front')}
                aria-pressed={previewSide === 'front'}
                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 motion-reduce:transition-none ${previewSide === 'front'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                Pregunta
              </button>

              <button
                type="button"
                onClick={() => setPreviewSide('back')}
                aria-pressed={previewSide === 'back'}
                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 motion-reduce:transition-none ${previewSide === 'back'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                Respuesta
              </button>
            </div>
          </div>

          <div className="w-full aspect-[4/3] rounded-3xl border border-slate-900 bg-slate-900/10 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 right-0 h-40 w-40 rounded-full bg-violet-600/5 blur-3xl" />
            <div aria-hidden="true" className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-indigo-600/5 blur-3xl" />

            <div className="flex justify-between items-center z-10">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <Tag aria-hidden="true" size={10} />
                {topic || 'Categoría'}
              </span>

              <span className={`text-[9px] font-black border rounded px-1.5 py-0.5 uppercase tracking-wider ${difficultyColors[difficulty]}`}>
                {difficultyLabels[difficulty]}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center py-4 text-center z-10" aria-live="polite">
              {previewSide === 'front' ? (
                <p className={`text-base font-bold leading-relaxed transition-all motion-reduce:transition-none ${question ? 'text-slate-200' : 'text-slate-600 italic'}`}>
                  {question || 'Escribe la pregunta en el formulario para previsualizar...'}
                </p>
              ) : (
                <p className={`text-sm leading-relaxed transition-all motion-reduce:transition-none ${answer ? 'text-slate-400' : 'text-slate-600 italic'}`}>
                  {answer || 'Escribe la respuesta en el formulario para previsualizar...'}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center text-[9px] text-slate-600 font-mono border-t border-slate-900/40 pt-3 z-10">
              <span>{isEditing ? `ID: ${card?.id.split('-').pop()}` : 'Tarjeta Nueva'}</span>
              <span>Modo Quiz</span>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}