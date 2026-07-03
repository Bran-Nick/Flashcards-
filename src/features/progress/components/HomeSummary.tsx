import { ArrowRight, TrendingUp, CheckCircle2, XCircle, Flame } from 'lucide-react';
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
    <Link
      to="/progress"
      aria-label={`Ir a progreso. Precisión general: ${total === 0 ? 'sin datos' : `${accuracyPercentage}%`}. Aciertos: ${totalHits}. Errores: ${totalMisses}. Racha actual: ${currentStreak} ${currentStreak === 1 ? 'día' : 'días'}.`}
      className="group relative block overflow-hidden rounded-2xl border-2 border-slate-900 bg-slate-900/40 p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-[0_12px_30px_rgba(139,92,246,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-violet-800/10 blur-3xl opacity-70 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
      />

      <div className="relative">
        <div className="md:hidden">
          <div className="relative text-center">
            <div className="flex flex-col items-center">
              <p className="text-xs text-slate-400 dark:text-slate-300 font-semibold uppercase tracking-wider">
                Progreso general
              </p>

              {total === 0 ? (
                <p className="text-sm font-bold text-slate-400 dark:text-slate-300 mt-1">
                  Sin datos
                </p>
              ) : (
                <p className="text-lg font-extrabold text-white">
                  {accuracyPercentage}%
                </p>
              )}
            </div>

            <div className="absolute right-0 top-1 text-slate-500 transition-colors group-hover:text-violet-400 motion-reduce:transition-none">
              <ArrowRight aria-hidden="true" size={18} />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div>
              <CheckCircle2 aria-hidden="true" className="mx-auto text-emerald-400" size={20} />
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Aciertos
              </p>
              <p className="text-sm font-bold text-emerald-400">{totalHits}</p>
            </div>

            <div>
              <XCircle aria-hidden="true" className="mx-auto text-rose-400" size={20} />
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Errores
              </p>
              <p className="text-sm font-bold text-rose-400">{totalMisses}</p>
            </div>

            <div>
              <Flame aria-hidden="true" className="mx-auto text-orange-400" size={20} />
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Racha
              </p>
              <p className="text-sm font-bold text-white">
                {currentStreak}d
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1.15fr_auto] items-center gap-6">
          <div className="flex items-center gap-3">
            <TrendingUp aria-hidden="true" className="text-violet-400 shrink-0" size={24} />
            <div className="text-center">
              <p className="text-xs text-slate-400 dark:text-slate-300 font-semibold uppercase tracking-wider">
                Tu progreso general
              </p>

              {total === 0 ? (
                <p className="text-sm font-bold text-slate-400 dark:text-slate-300 mt-1">
                  Sin datos
                </p>
              ) : (
                <div className="mt-1">
                  <p className="text-sm font-bold text-white">{accuracyPercentage}%</p>
                  <div
                    role="progressbar"
                    aria-label="Precisión general"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={accuracyPercentage}
                    className="mt-1 h-1.5 w-28 mx-auto bg-slate-800 rounded-full overflow-hidden"
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 motion-reduce:transition-none ${barColor}`}
                      style={{ width: `${accuracyPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <CheckCircle2 aria-hidden="true" className="text-emerald-400 shrink-0" size={24} />
            <div className="text-center">
              <p className="text-xs text-slate-400 dark:text-slate-300 font-semibold uppercase tracking-wider">Aciertos</p>
              <p className="text-sm font-bold text-emerald-400 mt-1">{totalHits}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <XCircle aria-hidden="true" className="text-rose-400 shrink-0" size={24} />
            <div className="text-center">
              <p className="text-xs text-slate-400 dark:text-slate-300 font-semibold uppercase tracking-wider">Errores</p>
              <p className="text-sm font-bold text-rose-400 mt-1">{totalMisses}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Flame aria-hidden="true" className="text-orange-400 shrink-0" size={24} />
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

          <div className="flex justify-end">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all duration-300 group-hover:bg-violet-600 group-hover:text-white motion-reduce:transition-none">
              <ArrowRight aria-hidden="true" size={18} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}