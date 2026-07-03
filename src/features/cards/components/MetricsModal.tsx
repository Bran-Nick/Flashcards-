import { X, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { useCardStore } from '../store';
import type { Card } from '../types';

interface MetricsModalProps {
  card: Card;
  onClose: () => void;
}

export default function MetricsModal({ card, onClose }: MetricsModalProps) {
  const resetCardMetrics = useCardStore((state) => state.resetCardMetrics);

  const total = card.hits + card.misses;
  const percentage = total === 0 ? 0 : Math.round((card.hits / total) * 100);

  // Últimas 10 respuestas en orden cronológico
  const recentHistory = (card.history ?? []).slice(-10);

  const handleReset = () => {
    if (window.confirm('¿Resetear las métricas de esta tarjeta? Esta acción no se puede deshacer.')) {
      resetCardMetrics(card.id);
      onClose();
    }
  };

  const percentageColor =
    percentage >= 70
      ? 'text-emerald-400'
      : percentage >= 40
        ? 'text-amber-400'
        : 'text-rose-400';

  const ringColor =
    percentage >= 70
      ? '#34d399'
      : percentage >= 40
        ? '#fbbf24'
        : '#f87171';

  // SVG circular progress
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Métricas de
            </p>
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white sm:text-base">
              {card.question}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar métricas"
            className="shrink-0 text-slate-500 transition-colors hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Stats Grid — 4 columnas como en el diseño */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="min-h-[75px] rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center space-y-1 sm:min-h-0 sm:p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Aciertos
              <span className="hidden sm:inline"> (hits)</span>
            </p>
            <p className="text-xl font-extrabold text-emerald-400 sm:text-2xl">
              {card.hits}
            </p>
          </div>

          <div className="min-h-[75px] rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-center space-y-1 sm:min-h-0 sm:p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
              Errores
              <span className="hidden sm:inline"> (misses)</span>
            </p>
            <p className="text-xl font-extrabold text-rose-400 sm:text-2xl">
              {card.misses}
            </p>
          </div>

          <div className="min-h-[75px] rounded-xl border border-slate-200 bg-slate-100 p-3 text-center space-y-1 dark:border-slate-800 dark:bg-slate-900/50 sm:min-h-0 sm:p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total
              <span className="hidden sm:inline"> respuestas</span>
            </p>
            <p className="text-xl font-extrabold text-slate-800 dark:text-white sm:text-2xl">
              {total}
            </p>
          </div>

          <div className="flex min-h-[75px] items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-3 text-center dark:border-slate-800 dark:bg-slate-900/50 sm:block sm:min-h-0 sm:p-4">
            <p className="hidden sm:block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Porcentaje de aciertos
            </p>

            <div className="relative flex items-center justify-center sm:mt-1">
              <svg width="56" height="56" className="-rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r={radius}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="5"
                />
                <circle
                  cx="28"
                  cy="28"
                  r={radius}
                  fill="none"
                  stroke={total === 0 ? '#1e293b' : ringColor}
                  strokeWidth="5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>

              <span className={`absolute text-xs font-extrabold sm:text-sm ${percentageColor}`}>
                {total === 0 ? '—' : `${percentage}%`}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="sm:hidden">Últimas respuestas</span>
            <span className="hidden sm:inline">
              Historial reciente{' '}
              <span className="font-normal text-slate-500">
                (últimas 10 respuestas)
              </span>
            </span>
          </p>

          {recentHistory.length === 0 ? (
            <p className="text-xs italic text-slate-500">
              Todavía no hay respuestas registradas para esta tarjeta.
            </p>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              {recentHistory.map((entry, index) =>
                entry === 'hit' ? (
                  <CheckCircle2 key={index} size={20} className="text-emerald-400 sm:size-[22px]" />
                ) : (
                  <XCircle key={index} size={20} className="text-rose-400 sm:size-[22px]" />
                )
              )}
            </div>
          )}
        </div>

        <div className="hidden rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-3 space-y-1 sm:block">
          <p className="text-xs font-bold text-violet-300">¿Qué significa?</p>
          <ul className="list-inside list-disc space-y-0.5 text-xs text-slate-400">
            <li>HIT (acierto): el usuario eligió "Lo sabía".</li>
            <li>MISS (error): el usuario eligió "No lo sabía".</li>
          </ul>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-slate-800/60 pt-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 px-3 py-2 text-xs font-semibold text-rose-400 transition-all hover:bg-rose-500/5 hover:text-rose-300 sm:px-4"
          >
            <RotateCcw size={13} />
            <span className="sm:hidden">Resetear</span>
            <span className="hidden sm:inline">Resetear métricas de esta tarjeta</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 transition-all hover:bg-slate-900 hover:text-white"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}