type DeckOption = {
  id: string;
  title: string;
  count: number;
};

type DeckSelectorProps = {
  decks: DeckOption[];
  onSelectDeck: (deckId: string) => void;
};

export default function DeckSelector({ decks, onSelectDeck }: DeckSelectorProps) {
  return (
  <div className="mt-4 mx-auto max-w-5xl rounded-3xl border border-slate-300 bg-slate-100 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 sm:mt-7 sm:p-10">
    <div className="grid grid-cols-2 gap-4 overflow-visible sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3">
      {decks.map((deck) => (
        <button
          key={deck.id}
          onClick={() => onSelectDeck(deck.id)}
          className="deck-card group text-left"
        >
          <span className="deck-card-front flex items-center justify-center text-center">
            <h2 className="line-clamp-2 text-sm font-bold text-slate-950 group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-300 sm:text-lg">
              {deck.title}
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:block">
              {deck.count} {deck.count === 1 ? 'tarjeta' : 'tarjetas'}
            </p>
          </span>
        </button>
      ))}
    </div>
  </div>
);
}