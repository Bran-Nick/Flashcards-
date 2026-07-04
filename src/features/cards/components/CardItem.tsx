import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Tag, BarChart2 } from 'lucide-react';
import type { Card } from '../types';
import MetricsModal from './MetricsModal';
import { getCardPriorityScore } from '../../study/utils/getOrderedCards';

interface CardItemProps {
  card: Card;
  onDelete: (id: string) => void;
}

export default function CardItem({ card, onDelete }: CardItemProps) {
  const [showMetrics, setShowMetrics] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const score = getCardPriorityScore(card);
  const needsReview = score > 60;

  const difficultyColors = {
    easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    hard: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const answerId = `card-answer-${card.id}`;

  return (
    <>
      {/* Mobile */}
      <div
        className="md:hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4"
        role="listitem"
      >
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls={answerId}
          aria-label={`${isExpanded ? 'Ocultar' : 'Mostrar'} respuesta de la tarjeta: ${card.question}`}
          className="w-full text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <p className={`text-[clamp(1rem,4.1vw,1.15rem)] font-semibold text-slate-100 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
            {card.question}
          </p>
        </button>

        {isExpanded && (
          <div id={answerId} className="border-t border-slate-900/60 pt-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Respuesta
            </p>
            <p className="text-[0.92rem] leading-relaxed text-slate-600 dark:text-slate-300">
              {card.answer}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {needsReview && (
                <span className="inline-flex text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-1 rounded-md">
                  ⚠️ Necesita repaso
                </span>
              )}

              <span
                className={`inline-flex text-[10px] font-bold px-2 py-1 rounded-md border uppercase tracking-wider ${difficultyColors[card.difficulty]}`}
              >
                {card.difficulty}
              </span>
            </div>
          </div>
        )}

        <div className="border-t border-slate-900/40 pt-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800 truncate">
              <Tag aria-hidden="true" size={12} />
              <span className="truncate max-w-[120px]">{card.topic}</span>
            </span>


            {!isExpanded && needsReview && (
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30"
                aria-label="Necesita repaso"
                title="Necesita repaso"
              >
                ⚠
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowMetrics(true)}
              aria-label={`Ver métricas de la tarjeta: ${card.question}`}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 text-slate-400 hover:text-violet-400 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <BarChart2 aria-hidden="true" size={16} />
            </button>

            <Link
              to={`/edit/${card.id}`}
              aria-label={`Editar tarjeta: ${card.question}`}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900/80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Edit2 aria-hidden="true" size={16} />
            </Link>

            <button
              type="button"
              onClick={() => onDelete(card.id)}
              aria-label={`Eliminar tarjeta: ${card.question}`}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Trash2 aria-hidden="true" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div
        className="hidden md:block group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4 hover:border-violet-500/40 hover:bg-slate-900/60 transition-all duration-300 motion-reduce:transition-none"
        role="listitem"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-violet-600/0 via-indigo-600/0 to-violet-600/0 group-hover:from-violet-600/2 group-hover:to-indigo-600/2 opacity-0 group-hover:opacity-100 transition-all duration-300 motion-reduce:transition-none"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-900/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
              <Tag aria-hidden="true" size={10} />
              {card.topic}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${difficultyColors[card.difficulty]}`}>
              {card.difficulty}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Pregunta</div>
            <p className="text-sm text-slate-200 font-medium leading-relaxed">{card.question}</p>
          </div>

          <div className="space-y-1 border-l border-slate-900/60 pl-4">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Respuesta</div>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">{card.answer}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-900/30">
          <span
            className="text-[10px] font-mono text-slate-600"
            title={card.createdAt ? `Creada el: ${new Date(card.createdAt).toLocaleString()}` : 'Sin fecha'}
          >
            Creada: {card.createdAt ? new Date(card.createdAt).toLocaleDateString() : 'N/A'}
          </span>

          {needsReview && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-md">
              ⚠️ Necesita repaso
            </span>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowMetrics(true)}
              aria-label={`Ver métricas de la tarjeta: ${card.question}`}
              className="flex items-center justify-center gap-1 border border-slate-800 text-slate-400 hover:text-violet-400 hover:border-violet-500/50 hover:bg-violet-500/5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              title="Ver métricas de esta tarjeta"
            >
              <BarChart2 aria-hidden="true" size={12} />
              <span>Métricas</span>
            </button>

            <Link
              to={`/edit/${card.id}`}
              aria-label={`Editar tarjeta: ${card.question}`}
              className="flex items-center justify-center gap-1 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900/80 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              title="Editar tarjeta"
            >
              <Edit2 aria-hidden="true" size={12} />
              <span>Editar</span>
            </Link>

            <button
              type="button"
              onClick={() => onDelete(card.id)}
              aria-label={`Eliminar tarjeta: ${card.question}`}
              className="flex items-center justify-center gap-1 border border-slate-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              title="Eliminar tarjeta"
            >
              <Trash2 aria-hidden="true" size={12} />
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </div>

      {showMetrics && (
        <MetricsModal
          card={card}
          onClose={() => setShowMetrics(false)}
        />
      )}
    </>
  );
}