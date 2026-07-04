import { Flame, Trophy, CheckCircle2, XCircle, TrendingUp, Calendar } from 'lucide-react';
import { useProgressStats } from '../features/progress/hooks/useProgressStats';
import { usePageTitle } from "../hooks/usePageTitle";
import PageHeader from '../components/PageHeader';
import PageShell from '../components/PageShell';

export default function ProgressPage() {
  usePageTitle("Progreso");

  const {
    currentStreak,
    bestStreak,
    totalHits,
    totalMisses,
    totalAnswers,
    accuracyPercentage,
    sessionHistory,
  } = useProgressStats();

  const barColor =
    accuracyPercentage >= 70
      ? 'bg-emerald-500'
      : accuracyPercentage >= 40
        ? 'bg-amber-500'
        : totalAnswers === 0
          ? 'bg-slate-700'
          : 'bg-rose-500';

  return (
    <PageShell size="narrow">
      <PageHeader
        title="Tu progreso"
        subtitle="Estadísticas generales y rachas de estudio."
        backTo="/"
      />

      {/* Resumen de progreso */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4" aria-label="Resumen de progreso">
        {/* Racha actual */}
        <div role="group" aria-label="Racha actual" className="bg-slate-900/40 border border-slate-800 rounded-2xl p-3 md:p-7 space-y-2 md:space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-orange-500 md:text-orange-400">
            <Flame size={18} className="md:size-5" aria-hidden="true" />
            <p className="text-[9px] md:text-xs font-bold uppercase tracking-wider text-center">Racha actual</p>
          </div>
          <p className="text-center text-2xl md:text-4xl font-extrabold text-white">
            {currentStreak}
            <span className="ml-1 md:ml-2 text-xs md:text-lg font-semibold text-slate-400">días</span>
          </p>
          {currentStreak === 0 && (
            <p className="hidden md:block text-xs text-slate-500">Completá un quiz para iniciar tu racha.</p>
          )}
        </div>

        {/* Mejor racha */}
        <div role="group" aria-label="Mejor racha" className="bg-slate-900/40 border border-slate-800 rounded-2xl p-3 md:p-7 space-y-2 md:space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-yellow-500 md:text-yellow-400">
            <Trophy size={18} className="md:size-5" aria-hidden="true" />
            <p className="text-[9px] md:text-xs font-bold uppercase tracking-wider text-center">Mejor racha</p>
          </div>
          <p className="text-center text-2xl md:text-4xl font-extrabold text-white">
            {bestStreak}
            <span className="ml-1 md:ml-2 text-xs md:text-lg font-semibold text-slate-400">días</span>
          </p>
        </div>

        {/* Progreso general */}
        <div role="group" aria-label="Progreso general" className="bg-slate-900/40 border border-slate-800 rounded-2xl p-3 md:p-6 space-y-2">
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-violet-500 md:text-violet-400">
            <TrendingUp size={18} className="md:size-5" aria-hidden="true" />
            <p className="text-[9px] md:text-xs font-bold uppercase tracking-wider text-center">
              <span className="md:hidden">Progreso</span>
              <span className="hidden md:inline">Progreso general</span>
            </p>
          </div>
          <p className="text-2xl md:text-4xl font-extrabold text-white text-center" aria-label={`Progreso general ${accuracyPercentage}%`}>
            {accuracyPercentage}%
          </p>
          <div
            role="progressbar"
            aria-valuenow={accuracyPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Precisión general"
            className="h-1.5 md:h-2 w-full bg-slate-800 rounded-full overflow-hidden"
          >
            <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${accuracyPercentage}%` }} />
          </div>
        </div>
      </div>

      {/* Desempeño general */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400">Desempeño general</h2>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div role="group" aria-label="Cantidad de aciertos" className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2 md:p-4 text-center space-y-1">
            <div className="flex items-center justify-center gap-1 text-emerald-600 md:text-emerald-400 dark:text-emerald-400">
              <CheckCircle2 size={14} aria-hidden="true" />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Aciertos</span>
            </div>
            <p className="text-xl md:text-2xl font-extrabold text-emerald-600 md:text-emerald-400 dark:text-emerald-400">{totalHits}</p>
          </div>
          <div role="group" aria-label="Cantidad de errores" className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-2 md:p-4 text-center space-y-1">
            <div className="flex items-center justify-center gap-1 text-rose-600 md:text-rose-400 dark:text-rose-400">
              <XCircle size={14} aria-hidden="true" />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Errores</span>
            </div>
            <p className="text-xl md:text-2xl font-extrabold text-rose-600 md:text-rose-400 dark:text-rose-400">{totalMisses}</p>
          </div>
          <div role="group" aria-label="Total de respuestas" className="rounded-xl border border-slate-500/20 bg-slate-500/5 p-2 md:p-4 text-center space-y-1">
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-slate-600 md:text-slate-500 dark:text-slate-300">
              <span className="md:hidden">Total</span>
              <span className="hidden md:inline">Total respuestas</span>
            </span>
            <p className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white">{totalAnswers}</p>
          </div>
        </div>
      </div>

      {/* Sesiones recientes */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Calendar size={16} aria-hidden="true" />
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">Sesiones recientes</h2>
        </div>
        {sessionHistory.length === 0 ? (
          <p className="text-sm text-slate-500 italic">Todavía no completaste ningún quiz.</p>
        ) : (
          <div role="table" aria-label="Historial de sesiones recientes" className="space-y-2">
            {[...sessionHistory].reverse().slice(0, 10).map((session, index) => {
              const total = session.hits + session.misses;
              const pct = total === 0 ? 0 : Math.round((session.hits / total) * 100);
              const date = new Date(session.date).toLocaleDateString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              });

              return (
                <div
                  key={index}
                  role="row"
                  className="grid grid-cols-4 items-center rounded-xl border border-slate-500/20 bg-slate-500/5 px-3 md:px-4 py-2 md:py-3 text-[0.8rem] font-medium md:text-sm md:font-normal text-center"
                >
                  <p role="cell" className="text-slate-500 dark:text-slate-300">{date}</p>
                  <p role="cell" className="text-emerald-600 md:text-emerald-500 dark:text-emerald-400 font-semibold">
                    <span className="md:hidden">{session.hits} ✓</span>
                    <span className="hidden md:inline">{session.hits} aciertos</span>
                  </p>
                  <p role="cell" className="text-rose-600 md:text-rose-500 dark:text-rose-400 font-semibold">
                    <span className="md:hidden">{session.misses} ✕</span>
                    <span className="hidden md:inline">{session.misses} errores</span>
                  </p>
                  <p role="cell" className="text-slate-800 dark:text-white font-bold">{pct}%</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageShell>
  );
}