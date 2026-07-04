import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Layers, Brain, HelpCircle, Home, BarChart3, Menu, X } from 'lucide-react';
import { ThemeToggle } from '../features/night-or-day/night-or-day';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: '/', name: 'Inicio', icon: Home, exact: true },
    { to: '/cards', name: 'Mis Tarjetas', icon: Layers, exact: false },
    { to: '/study/review', name: 'Modo Repaso', icon: Brain, exact: false },
    { to: '/study/quiz', name: 'Modo Quiz', icon: HelpCircle, exact: false },
    { to: '/progress', name: 'Progreso', icon: BarChart3, exact: false },
  ];

  return (
    <>
      {isMenuOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[50] bg-slate-950/70 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <header className="sticky top-0 z-[70] w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <NavLink
            to="/"
            aria-label="Ir al inicio de SmartFlash"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-xl"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/30 group-hover:scale-105 transition-transform duration-200">
              <BookOpen aria-hidden="true" className="text-white h-4.5 w-4.5" />
            </div>
            <div>
              <h1 className="text-md font-bold text-white tracking-tight leading-none">SmartFlash</h1>
              <span className="hidden sm:block text-[10px] text-slate-500 font-medium">
                Módulo de Tarjetas
              </span>
            </div>
          </NavLink>

          <nav aria-label="Navegación principal" className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
                ${isActive
                    ? 'bg-violet-600/10 text-violet-400 border border-violet-500/20 shadow-inner'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                  }`
                }
              >
                <item.icon aria-hidden="true" size={15} />
                <span className="hidden xs:inline">{item.name}</span>
              </NavLink>
            ))}
            <ThemeToggle />
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 md:hidden"
          >
            {isMenuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Navegación principal móvil"
            className="fixed left-0 right-0 top-16 z-[60] max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-slate-200 bg-white/95 px-4 py-3 shadow-xl shadow-slate-300/30 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-950/40 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  onClick={() => setIsMenuOpen(false)}
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950
                  ${isActive
                      ? 'bg-violet-600/10 text-violet-500 border border-violet-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent'
                    }`
                  }
                >
                  <item.icon aria-hidden="true" size={18} />
                  <span>{item.name}</span>
                </NavLink>
              ))}

              <div className="mt-2 border-t border-slate-200 pt-3 dark:border-slate-800">
                <p className="mb-2 px-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Preferencias
                </p>

                <ThemeToggle showLabel />
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}