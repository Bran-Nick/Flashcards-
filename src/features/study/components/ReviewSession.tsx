import type { Card } from '../../cards/types';

type ReviewSessionProps = {
  currentCard: Card;
  currentIndex: number;
  totalCards: number;
  progress: number;
  selectedTopic: string;
  showAnswer: boolean;
  direction: 'next' | 'prev';
  onShowAnswer: () => void;
  onNextCard: () => void;
  onPreviousCard: () => void;
  onChangeDeck: () => void;
};

export default function ReviewSession({
  currentCard,
  currentIndex,
  totalCards,
  progress,
  selectedTopic,
  showAnswer,
  direction,
  onShowAnswer,
  onNextCard,
  onPreviousCard,
  onChangeDeck,
}: ReviewSessionProps) {
  const isLastCard = currentIndex === totalCards - 1;
  const isReadyToFinish = isLastCard && showAnswer;

  return (
    <div className="relative mx-auto max-w-2xl space-y-4 max-sm:px-4">
      <div className="absolute left-0 top-0 hidden -translate-x-[115%] lg:block">
        <div className="rounded-2xl border border-slate-200/70 bg-white/60 px-5 py-4 shadow-sm backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/30">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Mazo actual
          </p>
          <p className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
            {selectedTopic === 'all' ? 'Todas las tarjetas' : selectedTopic}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/30 dark:shadow-[0_0_0_1px_rgba(139,92,246,0.08)] max-sm:p-5">
        <div className="mb-8 max-sm:mb-6">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 max-sm:text-xs">
              Tarjeta {currentIndex + 1} de {totalCards}
            </p>
            <p className="text-sm font-semibold text-violet-600 dark:text-violet-300 max-sm:text-xs">
              {Math.round(progress)}%
            </p>
          </div>

          <div
            role="progressbar"
            aria-valuenow={currentIndex + (showAnswer ? 1 : 0)}
            aria-valuemin={0}
            aria-valuemax={totalCards}
            aria-label={`Progreso: ${Math.round(progress)}% completado`}
            className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 max-sm:h-1.5"
          >
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          key={currentCard.id}
          aria-live="polite"
          className={`review-flip-card relative mt-12 max-sm:mt-6 ${
            direction === 'prev' ? 'study-card-enter-prev' : 'study-card-enter-next'
          }`}
        >
          <div className="study-card-deck max-sm:hidden" aria-hidden="true">
            {Array.from({
              length: Math.min(3, Math.max(totalCards - currentIndex - 1, 0)),
            }).map((_, index) => (
              <span
                key={index}
                className="study-card-deck-item"
                style={{ '--deck-index': index } as React.CSSProperties}
              />
            ))}
          </div>

          <div className={`review-flip-inner max-sm:!min-h-[185px] ${showAnswer ? 'is-flipped' : ''}`}>
            <div className="review-flip-face review-flip-front max-sm:!p-5">
              <div className="flex h-full min-h-44 items-center max-sm:min-h-28">
                <h2 className="text-2xl font-semibold leading-relaxed text-slate-950 dark:text-white max-sm:text-base">
                  {currentCard.question}
                </h2>
              </div>
            </div>

            <div className="review-flip-face review-flip-back max-sm:!p-5">
              <div className="flex h-full min-h-44 flex-col justify-center max-sm:min-h-28">
                <p className="mb-4 text-sm font-bold uppercase tracking-wider text-violet-500 dark:text-violet-300 max-sm:mb-2 max-sm:text-[10px]">
                  Respuesta
                </p>
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200 max-sm:text-sm">
                  {currentCard.answer}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 items-end gap-4 max-sm:mt-7 max-sm:items-center max-sm:gap-2">
          <div className="flex justify-start">
            <button
              onClick={onPreviousCard}
              disabled={currentIndex === 0}
              aria-label="Ir a la tarjeta anterior"
              className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 transition-colors hover:border-violet-400 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:text-violet-300 max-sm:w-full max-sm:px-2 max-sm:py-2 max-sm:text-xs max-sm:font-semibold"
            >
              Anterior
            </button>
          </div>

          <div className="flex justify-center pb-4 max-sm:pb-0">
            <button
              onClick={onShowAnswer}
              aria-label={showAnswer ? "Ocultar respuesta y ver pregunta" : "Mostrar respuesta"}
              className="rounded-xl bg-violet-600 px-6 py-3 font-semibold !text-white transition-colors hover:bg-violet-500 max-sm:w-full max-sm:px-2 max-sm:py-2.5 max-sm:text-xs"
            >
              <span className="max-sm:hidden">
                {showAnswer ? 'Ver pregunta' : 'Ver respuesta'}
              </span>
              <span className="hidden max-sm:inline">
                {showAnswer ? 'Pregunta' : 'Respuesta'}
              </span>
            </button>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onNextCard}
              aria-label={isReadyToFinish ? "Finalizar sesión de repaso" : "Ir a la siguiente tarjeta"}
              className={
                isReadyToFinish
                  ? 'rounded-xl bg-emerald-500 px-7 py-3 font-semibold !text-white shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-400 max-sm:w-full max-sm:px-2 max-sm:py-2.5 max-sm:text-xs'
                  : 'rounded-xl border border-slate-300 px-4 py-2 text-slate-700 transition-colors hover:border-violet-400 hover:text-violet-600 dark:border-slate-700 dark:text-slate-300 dark:hover:text-violet-300 max-sm:w-full max-sm:px-2 max-sm:py-2 max-sm:text-xs max-sm:font-semibold'
              }
            >
              <span className="max-sm:hidden">
                {isReadyToFinish ? '✓ Finalizar' : isLastCard ? 'Finalizar' : 'Siguiente'}
              </span>
              <span className="hidden max-sm:inline">
                {isReadyToFinish ? '✓ Fin' : isLastCard ? 'Fin' : 'Siguiente'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 lg:hidden max-sm:px-4 max-sm:py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 max-sm:text-[10px]">
            Mazo actual
          </p>
          <p className="text-base font-semibold text-slate-950 dark:text-white max-sm:text-sm">
            {selectedTopic === 'all' ? 'Todas las tarjetas' : selectedTopic}
          </p>
        </div>

        <button
          onClick={onChangeDeck}
          aria-label="Cambiar mazo actual"
          className="text-sm text-slate-600 transition-colors hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-300 max-sm:text-xs max-sm:font-semibold"
        >
          Cambiar mazo
        </button>
      </div>
    </div>
  );
}