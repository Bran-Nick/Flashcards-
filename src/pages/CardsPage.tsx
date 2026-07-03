import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, RotateCcw, BookOpen } from 'lucide-react';
import { useCardStore } from '../features/cards/store';
import CardList from '../features/cards/components/CardList';
import CardsToolbar from '../features/cards/components/CardsToolbar';
import { usePageTitle } from "../hooks/usePageTitle";
import PageHeader from '../components/PageHeader';
import PageShell from '../components/PageShell';

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export default function CardsPage() {
  usePageTitle("Mis Tarjetas");
  const cards = useCardStore((state) => state.cards);
  const deleteCard = useCardStore((state) => state.deleteCard);
  const resetCards = useCardStore((state) => state.resetCards);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');

  const safeCards = cards || [];
  const topics = Array.from(new Set(safeCards.map((c) => c.topic))).filter(Boolean);

  const normalizedSearch = normalizeText(searchTerm);

  const filteredCards = safeCards.filter((card) => {
    const normalizedQuestion = normalizeText(card.question);
    const normalizedAnswer = normalizeText(card.answer);
    const matchesSearch =
      normalizedQuestion.includes(normalizedSearch) ||
      normalizedAnswer.includes(normalizedSearch);

    const matchesTopic = selectedTopic === 'all' || card.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  const totalCards = safeCards.length;

  const handleDeleteCard = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarjeta?')) {
      deleteCard(id);
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que quieres restaurar las tarjetas semilla iniciales? Esto borrará tus tarjetas personalizadas.')) {
      resetCards();
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <PageShell size="wide">
        <PageHeader
          title="Mis Tarjetas"
          subtitle={
            <div className="flex flex-wrap items-center gap-2">
              <span>Administra tus tarjetas de estudio.</span>

              <span
                aria-label={`${totalCards} ${totalCards === 1 ? 'tarjeta' : 'tarjetas'} y ${topics.length} ${topics.length === 1 ? 'tema' : 'temas'}`}
                className="inline-flex items-center gap-1.5 px-3 py-0.5 text-[11px] font-bold font-mono rounded-full bg-slate-900 border border-slate-800 text-violet-400"
              >
                <BookOpen aria-hidden="true" size={12} />
                {totalCards} {totalCards === 1 ? 'tarjeta' : 'tarjetas'} •{" "}
                {topics.length} {topics.length === 1 ? 'tema' : 'temas'}
              </span>
            </div>
          }
          backTo="/"
          showDivider={false}
          actions={
            <>
              <button
                type="button"
                onClick={handleReset}
                aria-label="Restaurar tarjetas semilla"
                className="flex items-center justify-center gap-1.5 border border-slate-900 hover:bg-slate-900 text-slate-400 hover:text-slate-200 font-semibold text-xs rounded-xl transition-all h-9 w-9 p-0 sm:h-auto sm:w-auto sm:px-4 sm:py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                title="Reiniciar base de datos a tarjetas semillas"
              >
                <RotateCcw aria-hidden="true" size={16} />
                <span className="hidden sm:inline">Restaurar Semillas</span>
              </button>

              <Link
                to="/new"
                aria-label="Crear nueva tarjeta"
                className="flex items-center justify-center gap-2 h-9 w-9 p-0 sm:h-auto sm:w-auto sm:px-5 sm:py-2.5 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-semibold text-xs rounded-xl transition-all shadow-lg shadow-violet-600/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <Plus aria-hidden="true" size={17} />
                <span className="hidden sm:inline">Nueva Tarjeta</span>
              </Link>
            </>
          }
        />

        <p className="sr-only" aria-live="polite">
          {filteredCards.length} {filteredCards.length === 1 ? 'tarjeta encontrada' : 'tarjetas encontradas'}.
        </p>

        <CardsToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          topics={topics}
        />

        <CardList
          filteredCards={filteredCards}
          onDelete={handleDeleteCard}
          searchTerm={searchTerm}
          selectedTopic={selectedTopic}
        />
      </PageShell>
    </div>
  );
}