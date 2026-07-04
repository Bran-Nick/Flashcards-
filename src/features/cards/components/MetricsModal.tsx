import { useEffect, useState } from 'react';
import { X, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { useCardStore } from '../store';
import type { Card } from '../types';

interface MetricsModalProps {
  card: Card;
  onClose: () => void;
}

export default function MetricsModal({ card, onClose }: MetricsModalProps) {
  const resetCardMetrics = useCardStore((state) => state.resetCardMetrics);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const total = card.hits + card.misses;
  const percentage = total === 0 ? 0 : Math.round((card.hits / total) * 100);
  const recentHistory = (card.history ?? []).slice(-10);

  const percentageColor =
    percentage >= 70
      ? 'text-emerald-600 dark:text-emerald-400'
      : percentage >= 40
        ? 'text-amber-500 dark:text-amber-400'
        : 'text-rose-500 dark:text-rose-400';

  const ringColor =
    percentage >= 70 ? '#059669' : percentage >= 40 ? '#d97706' : '#e11d48';

  const radius = 28;
  const mobileRadius = 24;
  const circumference = 2 * Math.PI * radius;
  const mobileCircumference = 2 * Math.PI * mobileRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const mobileStrokeDashoffset = mobileCircumference - (percentage / 100) * mobileCircumference;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    resetCardMetrics(card.id);
    setShowResetConfirm(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="metrics-title"
      aria-describedby="metrics-description"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 max-sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl space-y-5 max-sm:max-h-[calc(100svh-2rem)] max-sm:overflow-y-auto max-sm:p-6 max-sm:space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              id="metrics-description"
              className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500"
            >
              Métricas de
            </p>
            <h3
              id="metrics-title"
              className="line-clamp-2 text-base font-semibold leading-snug text-white max-sm:text-sm"
            >
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
        <div className="grid grid-cols-4 gap-3 max-sm:grid-cols-2">
          {/* Aciertos */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-center space-y-1 max-sm:p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <span className="max-sm:hidden">Aciertos (hits)</span>
              <span className="hidden max-sm:inline">Aciertos</span>
            </p>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 max-sm:text-xl">{card.hits}</p>
          </div>

          {/* Errores */}
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-center space-y-1 max-sm:p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
              <span className="max-sm:hidden">Errores (misses)</span>
              <span className="hidden max-sm:inline">Errores</span>
            </p>
            <p className="text-2xl font-extrabold text-rose-400 max-sm:text-xl">{card.misses}</p>
          </div>

          {/* Total */}
          <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 text-center space-y-1 dark:border-slate-800 dark:bg-slate-900/50 max-sm:p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span className="max-sm:hidden">Total respuestas</span>
              <span className="hidden max-sm:inline">Total</span>
            </p>
            <p className="text-2xl font-extrabold text-slate-800 dark:text-white max-sm:text-xl">{total}</p>
          </div>

          {/* Porcentaje */}
          <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 text-center space-y-1 dark:border-slate-800 dark:bg-slate-900/50 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 max-sm:hidden">
              Porcentaje de aciertos
            </p>

            <div
              role="progressbar"
              aria-label="Porcentaje de aciertos"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percentage}
              className="relative flex items-center justify-center mt-1 max-sm:mt-0"
            >
              {/* Desktop ring */}
              <svg width="70" height="70" className="-rotate-90 max-sm:hidden" aria-hidden="true">
                <circle
                  cx="35"
                  cy="35"
                  r={radius}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="6"
                />
                <circle
                  cx="35"
                  cy="35"
                  r={radius}
                  fill="none"
                  stroke={total === 0 ? '#1e293b' : ringColor}
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 motion-reduce:transition-none"
                />
              </svg>

              {/* Mobile ring */}
              <svg width="56" height="56" className="-rotate-90 hidden max-sm:block" aria-hidden="true">
                <circle
                  cx="28"
                  cy="28"
                  r={mobileRadius}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="5"
                />
                <circle
                  cx="28"
                  cy="28"
                  r={mobileRadius}
                  fill="none"
                  stroke={total === 0 ? '#1e293b' : ringColor}
                  strokeWidth="5"
                  strokeDasharray={mobileCircumference}
                  strokeDashoffset={mobileStrokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 motion-reduce:transition-none"
                />
              </svg>

              <span className={`absolute text-sm font-extrabold ${percentageColor} max-sm:text-xs`}>
                {total === 0 ? '—' : `${percentage}%`}
              </span>
            </div>
          </div>
        </div>

        {/* Historial */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-300 max-sm:text-slate-500">
            <span className="max-sm:hidden">
              Historial reciente{' '}
              <span className="text-slate-500 dark:text-slate-400 font-normal">(últimas 10 respuestas)</span>
            </span>
            <span className="hidden max-sm:inline">Últimas respuestas</span>
          </p>

          {recentHistory.length === 0 ? (
            <p className="text-xs italic text-slate-500">
              Todavía no hay respuestas registradas para esta tarjeta.
            </p>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              {recentHistory.map((entry, index) =>
                entry === 'hit' ? (
                  <CheckCircle2
                    key={index}
                    size={22}
                    className="text-emerald-600 dark:text-emerald-400 max-sm:size-5"
                    role="img"
                    aria-label="Acierto"
                  />
                ) : (
                  <XCircle
                    key={index}
                    size={22}
                    className="text-rose-400 max-sm:size-5"
                    role="img"
                    aria-label="Error"
                  />
                )
              )}
            </div>
          )}
        </div>

        {/* Sección informativa */}
        <div className="hidden sm:block rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-3 space-y-1">
          <p className="text-xs font-bold text-violet-400">
            ¿Qué significa?
          </p>

          <ul className="text-xs text-slate-400 space-y-0.5 list-disc list-inside">
            <li>HIT (acierto): el usuario eligió "Lo sabía".</li>
            <li>MISS (error): el usuario eligió "No lo sabía".</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center gap-2 pt-1 border-t border-slate-800/60 max-sm:pt-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-500/30 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500 max-sm:px-3"
          >
            <RotateCcw size={13} aria-hidden="true" />

            <span>
              <span className="max-sm:hidden">
                Resetear métricas de esta tarjeta
              </span>

              <span className="hidden max-sm:inline">
                Resetear métricas
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <span className="max-sm:hidden">Cerrar</span>
            <span className="hidden max-sm:inline">Volver</span>
          </button>
        </div>

        {showResetConfirm && (
          <div
            role="alertdialog"
            aria-modal="true"
            className="rounded-xl border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900 dark:bg-rose-950/20"
          >
            <p className="text-sm font-semibold text-rose-900 dark:text-rose-100">
              ¿Resetear las métricas?
            </p>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Esta acción no se puede deshacer.
            </p>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmReset}
                className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold !text-white"
              >
                Resetear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}