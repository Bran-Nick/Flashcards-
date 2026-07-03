import { useEffect } from 'react';
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
  const recentHistory = (card.history ?? []).slice(-10);

  const percentageColor =
    percentage >= 70 ? 'text-emerald-400' : percentage >= 40 ? 'text-amber-400' : 'text-rose-400';

  const ringColor =
    percentage >= 70 ? '#34d399' : percentage >= 40 ? '#fbbf24' : '#f87171';

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Cerrar con ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleReset = () => {
    // Aquí podrías usar otro modal accesible en vez de window.confirm
    if (window.confirm('¿Resetear las métricas de esta tarjeta? Esta acción no se puede deshacer.')) {
      resetCardMetrics(card.id);
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="metrics-title"
      aria-describedby="metrics-description"
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
            <p id="metrics-description" className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Métricas de
            </p>
            <h3 id="metrics-title" className="line-clamp-2 text-sm font-semibold leading-snug text-white sm:text-base">
              {card.question}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar métricas"
            className="shrink-0 text-slate-500 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-md"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {/* Aciertos */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Aciertos</p>
            <p className="text-xl font-extrabold text-emerald-400">{card.hits}</p>
          </div>
          {/* Errores */}
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-center space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Errores</p>
            <p className="text-xl font-extrabold text-rose-400">{card.misses}</p>
          </div>
          {/* Total */}
          <div className="rounded-xl border border-slate-200 bg-slate-100 p-3 text-center space-y-1 dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total</p>
            <p className="text-xl font-extrabold text-slate-800 dark:text-white">{total}</p>
          </div>
          {/* Porcentaje */}
          <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-3 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="relative flex items-center justify-center">
              <svg width="56" height="56" className="-rotate-90">
                <circle cx="28" cy="28" r={radius} fill="none" stroke="#1e293b" strokeWidth="5" />
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
                />
              </svg>
              <span className={`absolute text-xs font-extrabold ${percentageColor}`}>
                {total === 0 ? '—' : `${percentage}%`}
              </span>
            </div>
          </div>
        </div>

        {/* Historial */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500">Últimas respuestas</p>
          {recentHistory.length === 0 ? (
            <p className="text-xs italic text-slate-500">Todavía no hay respuestas registradas.</p>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              {recentHistory.map((entry, index) =>
                entry === 'hit' ? (
                  <CheckCircle2 key={index} size={20} className="text-emerald-400" aria-label="Acierto" />
                ) : (
                  <XCircle key={index} size={20} className="text-rose-400" aria-label="Error" />
                )
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-800/60 pt-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/5 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <RotateCcw size={13} aria-hidden="true" />
            <span>Resetear métricas</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
