import { useEffect, useRef, useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface CardsToolbarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedTopic: string;
  setSelectedTopic: (value: string) => void;
  topics: string[];
}

export default function CardsToolbar({
  searchTerm,
  setSearchTerm,
  selectedTopic,
  setSelectedTopic,
  topics,
}: CardsToolbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        searchTerm.trim() === ''
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchTerm]);

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setIsFilterOpen(false);
  };

  return (
    <div
      className="flex shrink-0 items-center justify-between gap-2 rounded-2xl border border-slate-900/40 bg-slate-900/10 p-3 sm:gap-3 sm:p-4"
      role="toolbar"
      aria-label="Herramientas de búsqueda y filtros"
    >
      {/* Mobile search */}
      <div
        ref={searchRef}
        className={`flex h-11 items-center rounded-xl border border-slate-800 bg-slate-950 text-slate-400 transition-all sm:hidden ${
          isSearchOpen ? 'w-full px-3' : 'w-11 justify-center'
        }`}
      >
        <button
          type="button"
          onClick={() => setIsSearchOpen((prev) => !prev)}
          aria-label={isSearchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
          aria-expanded={isSearchOpen}
          aria-controls="mobile-search-input"
          className="flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <Search size={17} aria-hidden="true" />
        </button>

        {isSearchOpen && (
          <input
            id="mobile-search-input"
            autoFocus
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por pregunta o respuesta"
            className="ml-2 min-w-0 flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
          />
        )}
      </div>

      {/* Desktop search */}
      <div className="relative hidden max-w-md flex-1 sm:block">
        <label htmlFor="desktop-search-input" className="sr-only">
          Buscar por pregunta o respuesta
        </label>
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
          <Search size={15} aria-hidden="true" />
        </span>

        <input
          id="desktop-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por pregunta o respuesta..."
          className="w-full rounded-xl border border-slate-900 bg-slate-950 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-200 placeholder-slate-500 transition-all focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 sm:text-sm"
        />
      </div>

      {/* Desktop filter */}
      <div className="hidden items-center gap-3 sm:flex">
        <span
          className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-500"
          id="desktop-filter-label"
        >
          <SlidersHorizontal size={14} aria-hidden="true" />
          Filtrar:
        </span>

        <select
          aria-labelledby="desktop-filter-label"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="rounded-xl border border-slate-900 bg-slate-950 px-4 py-2.5 text-xs font-semibold text-slate-400 transition-all focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 sm:text-sm"
        >
          <option value="all" className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            Todos los temas
          </option>
          {topics.map((topic) => (
            <option
              key={topic}
              value={topic}
              className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100"
            >
              {topic}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile filter */}
      <div ref={filterRef} className="relative sm:hidden">
        <button
          type="button"
          onClick={() => setIsFilterOpen((prev) => !prev)}
          aria-label="Abrir filtros"
          aria-expanded={isFilterOpen}
          aria-controls="mobile-filter-menu"
          className={`flex h-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-300 transition-all hover:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
            isSearchOpen ? 'w-11' : 'w-28 gap-2 px-4'
          }`}
        >
          <SlidersHorizontal size={15} aria-hidden="true" />

          {!isSearchOpen && (
            <>
              <span>Filtros</span>
              <ChevronDown
                size={15}
                className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </>
          )}
        </button>

        {isFilterOpen && (
          <div
            id="mobile-filter-menu"
            role="menu"
            aria-label="Opciones de filtro"
            className="absolute right-0 top-full z-40 mt-2 w-44 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => handleSelectTopic('all')}
              className={`block w-full px-4 py-2.5 text-left text-xs font-semibold transition-colors focus:bg-violet-600/20 focus:outline-none ${
                selectedTopic === 'all'
                  ? 'bg-violet-600/10 text-violet-400'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              Todos los temas
            </button>

            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                role="menuitem"
                onClick={() => handleSelectTopic(topic)}
                className={`block w-full px-4 py-2.5 text-left text-xs font-semibold transition-colors focus:bg-violet-600/20 focus:outline-none ${
                  selectedTopic === topic
                    ? 'bg-violet-600/10 text-violet-400'
                    : 'text-slate-500 hover:bg-slate-900'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}