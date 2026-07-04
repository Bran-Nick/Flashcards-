import { useCardStore } from '../../cards/store';

type QuizResultActionsProps = {
  cardId: string;
  onNextCard: () => void;
  onRecordResult: (result: 'hit' | 'miss') => void;
};

export default function QuizResultActions({
  cardId,
  onNextCard,
  onRecordResult,
}: QuizResultActionsProps) {
  const recordResult = useCardStore((state) => state.recordResult);

  const handleCorrect = () => {
    recordResult(cardId, 'hit');
    onRecordResult('hit');
    onNextCard();
  };

  const handleIncorrect = () => {
    recordResult(cardId, 'miss');
    onRecordResult('miss');
    onNextCard();
  };

  return (
    <div className="quiz-result-actions mt-1 flex flex-col justify-center gap-3 sm:flex-row">
      <button
        onClick={handleIncorrect}
        aria-label="Marcar como incorrecto y pasar a la siguiente tarjeta"
        className="study-button quiz-result-button rounded-xl border border-rose-300 px-5 py-3 font-semibold text-rose-600 transition-colors hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-950/40"
      >
        No lo sabía
      </button>

      <button
        onClick={handleCorrect}
        aria-label="Marcar como correcto y pasar a la siguiente tarjeta"
        className="study-button quiz-result-button rounded-xl border border-emerald-300 px-5 py-3 font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
      >
        Lo sabía
      </button>
    </div>
  );
}