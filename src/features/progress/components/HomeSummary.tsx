import { TrendingUp, CheckCircle2, XCircle, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgressStats } from '../hooks/useProgressStats';

export default function HomeSummary() {
  const {
    currentStreak,
    bestStreak,
    totalHits,
    totalMisses,
    accuracyPercentage,
  } = useProgressStats();

  const total = totalHits + totalMisses;

  const barColor =
    accuracyPercentage >= 70
      ? 'bg-emerald-500'
      : accuracyPercentage >= 40
        ? 'bg-amber-500'
        : total === 0
          ? 'bg-slate-700'
          : 'bg-rose-500';

  return (
  <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
    <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-violet-800/10 blur-3xl pointer-events-none" />

    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1fr_1fr_1.15fr_auto] md:items-center">
      {/* Progreso */}
      <div className="flex items-center gap-3">
        <TrendingUp className="text-violet-400 shrink-0" size={24} />
        <div className="text-center">
          <p className="text-xs text-slate-400 dark:text-slate-300 font-semibold uppercase tracking-wider">
            Tu progreso general
          </p>

          {total === 0 ? (
            <p className="text-sm font-bold text-slate-400 dark:text-slate-300 mt-1">Sin datos</p>
          ) : (
            <div className="mt-1">
              <p className="text-sm font-bold text-white">{accuracyPercentage}%</p>
              <div className="mt-1 h-1.5 w-28 mx-auto bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${accuracyPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Aciertos */}
      <div className="flex items-center justify-center gap-3">
        <CheckCircle2 className="text-emerald-400 shrink-0" size={24} />
        <div className="text-center">
          <p className="text-xs text-slate-400 dark:text-slate-300 font-semibold uppercase tracking-wider">Aciertos</p>
          <p className="text-sm font-bold text-emerald-400 mt-1">{totalHits}</p>
        </div>
      </div>

      {/* Errores */}
      <div className="flex items-center justify-center gap-3">
        <XCircle className="text-rose-400 shrink-0" size={24} />
        <div className="text-center">
          <p className="text-xs text-slate-400 dark:text-slate-300 font-semibold uppercase tracking-wider">Errores</p>
          <p className="text-sm font-bold text-rose-400 mt-1">{totalMisses}</p>
        </div>
      </div>

      {/* Racha */}
      <div className="flex items-center justify-center gap-3">
        <Flame className="text-orange-400 shrink-0" size={24} />
        <div className="text-center">
          <p className="text-xs text-slate-400 dark:text-slate-300 font-semibold uppercase tracking-wider">Racha actual</p>
          <p className="text-sm font-bold text-white mt-1">
            {currentStreak} {currentStreak === 1 ? 'día' : 'días'}
            {currentStreak > 0 && ' 🔥'}
          </p>
          {bestStreak > 0 && (
            <p className="text-[10px] text-slate-500 dark:text-slate-300">Mejor: {bestStreak} días</p>
          )}
        </div>
      </div>

      <Link
        to="/progress"
        className="justify-self-center text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors whitespace-nowrap"
      >
        Ver más →
      </Link>
    </div>
  </div>
);
}