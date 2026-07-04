import { HelpCircle } from 'lucide-react';
import CardItem from './CardItem';
import type { Card } from '../types';

interface CardListProps {
  filteredCards: Card[];
  onDelete: (id: string) => void;
  searchTerm: string;
  selectedTopic: string;
}

export default function CardList({
  filteredCards,
  onDelete,
  searchTerm,
  selectedTopic,
}: CardListProps) {
  return (
    <div className="flex-1 space-y-4">
      {filteredCards.length > 0 ? (
        <div
          className="grid grid-cols-1 gap-3 sm:gap-4 xl:grid-cols-2"
          role="list"
          aria-label="Lista de tarjetas"
        >
          {filteredCards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div
          className="rounded-3xl border border-dashed border-slate-900 bg-slate-900/5 px-5 py-14 text-center sm:py-20"
          role="status"
          aria-live="polite"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-slate-500">
            <HelpCircle size={20} aria-hidden="true" />
          </div>
          <h4 className="text-lg font-bold text-slate-300">No se encontraron tarjetas</h4>
          <p className="mx-auto mt-1 max-w-xs text-sm text-slate-500">
            {searchTerm || selectedTopic !== 'all' 
              ? 'Intenta modificando los filtros de búsqueda o categoría.' 
              : 'Crea tu primera tarjeta de estudio para empezar.'}
          </p>
        </div>
      )}
    </div>
  );
}