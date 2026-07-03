type DeckOption = {
  id: string;
  title: string;
  count: number;
};

type DeckSelectorProps = {
  decks: DeckOption[];
  onSelectDeck: (deckId: string) => void;
  selectedDeckId?: string; 
};

export default function DeckSelector({ decks, onSelectDeck, selectedDeckId }: DeckSelectorProps) {
  return (
    <section
      aria-labelledby="deck-selector-title"
      className="mt-4 mx-auto max-w-5xl rounded-3xl border border-slate-300 bg-slate-100 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 sm:mt-7 sm:p-10"
    >
      <h1 id="deck-selector-title" className="sr-only">
        Selección de mazo de tarjetas
      </h1>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3">
        {decks.map((deck) => (
          <li key={deck.id}>
            <button
              onClick={() => onSelectDeck(deck.id)}
              aria-label={`Seleccionar mazo ${deck.title} con ${deck.count} ${deck.count === 1 ? 'tarjeta' : 'tarjetas'}`}
              aria-pressed={selectedDeckId === deck.id}
              className={`deck-card group w-full text-left rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors 
                ${selectedDeckId === deck.id ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}
              `}
            >
              <div className="deck-card-front flex flex-col items-center justify-center text-center p-4">
                <h2 className="line-clamp-2 text-sm font-bold text-slate-950 group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-300 sm:text-lg">
                  {deck.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:block">
                  {deck.count} {deck.count === 1 ? 'tarjeta' : 'tarjetas'}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}