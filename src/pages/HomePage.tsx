import { Link } from 'react-router-dom';
import { Layers, Brain, HelpCircle, BarChart3, ArrowRight } from 'lucide-react';
import HomeSummary from '../features/progress/components/HomeSummary';
import { usePageTitle } from "../hooks/usePageTitle";

export default function HomePage() {
  usePageTitle("Inicio");

  const homeCards = [
    {
      to: '/cards',
      title: 'Mis tarjetas',
      description: 'Crea, edita y organiza tus tarjetas de estudio.',
      icon: Layers,
    },
    {
      to: '/study/review',
      title: 'Modo Repaso',
      description: 'Repasa las tarjetas y refuerza tu memoria.',
      icon: Brain,
    },
    {
      to: '/study/quiz',
      title: 'Modo Quiz',
      description: 'Poné a prueba tus conocimientos.',
      icon: HelpCircle,
    },
    {
      to: '/progress',
      title: 'Progreso',
      description: 'Mirá tus estadísticas y rachas.',
      icon: BarChart3,
    },
  ];

  return (
    <div className="w-full sm:max-w-6xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          ¡Bienvenido!
        </h2>
        <p className="text-base sm:text-lg text-slate-400">
          ¿Qué te gustaría hacer hoy?
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 mb-8 sm:mb-12">
        {homeCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.to}
              to={card.to}
              aria-label={`${card.title}: ${card.description}`}
              className="relative group bg-slate-900/40 border-2 border-slate-900 hover:border-violet-500/30 rounded-2xl p-4 sm:p-6 flex flex-col justify-center md:justify-between min-h-[140px] sm:min-h-[180px] md:min-h-[250px] transition-all hover:shadow-lg hover:shadow-violet-600/5 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none"
            >
              <div className="flex flex-col items-center text-center md:mt-4">
                <div className="p-2.5 sm:p-3 bg-violet-600/10 rounded-xl text-violet-400 mb-3 sm:mb-4 group-hover:scale-105 transition-transform motion-reduce:transform-none motion-reduce:transition-none">
                  <Icon aria-hidden="true" size={28} className="sm:hidden" />
                  <Icon aria-hidden="true" size={32} className="hidden sm:block" />
                </div>

                <h3 className="text-sm sm:text-lg font-bold text-white md:mb-2">
                  {card.title}
                </h3>

                <p className="hidden md:block text-sm text-slate-400 px-2">
                  {card.description}
                </p>
              </div>

              <div className="hidden md:flex justify-end mt-4">
                <div className="p-2 bg-slate-800 text-slate-300 rounded-full group-hover:bg-violet-600 group-hover:text-white transition-colors motion-reduce:transition-none">
                  <ArrowRight aria-hidden="true" size={16} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <HomeSummary />
    </div>
  );
}