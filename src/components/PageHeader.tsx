import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: ReactNode;
  mobileSubtitle?: ReactNode | null;
  backTo?: string;
  backLabel?: string;
  actions?: ReactNode;
  showDivider?: boolean;
  variant?: 'selector' | 'session' | 'finished';
}

export default function PageHeader({
  title,
  subtitle,
  mobileSubtitle,
  backTo,
  backLabel = 'Volver al inicio',
  actions,
  showDivider = true,
  variant,

}: PageHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-5 pb-5 md:gap-6 md:pb-6 md:flex-row md:items-start md:justify-between ${showDivider ? 'md:border-b md:border-slate-200 md:dark:border-slate-700' : ''
        }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          {backTo && (
            <Link
              to={backTo}
              aria-label={backLabel}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-600 shadow-sm transition-colors hover:border-violet-300 hover:text-violet-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300 dark:hover:text-violet-400 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
            >
              <ArrowLeft aria-hidden="true" size={20} />
            </Link>
          )}

          <h1
            className={`min-w-0 flex-1 font-extrabold tracking-tight text-white
    ${variant === 'session'
                ? 'text-[clamp(1.65rem,7vw,2.1rem)] sm:text-3xl'
                : 'text-[clamp(1rem,8vw,2.45rem)] sm:text-3xl'}`}
          >
            {title}
          </h1>


          {actions && (
            <div className="flex shrink-0 items-center gap-2 md:hidden">
              {actions}
            </div>
          )}
        </div>

        {subtitle && (
          <>
            {/* Mobile */}
            {mobileSubtitle !== null && (
              <div className=" mt-3 ml-5 text-[clamp(1rem,4vw,1.15rem)] leading-relaxed text-slate-400 md:hidden">
                {mobileSubtitle ?? subtitle}
              </div>
            )}

            {/* Desktop */}
            <div className="hidden md:block mt-3 text-base text-slate-400">
              {subtitle}
            </div>
          </>
        )}
      </div>

      <div className="hidden shrink-0 flex-col items-start gap-4 md:flex md:items-end">
        {backTo && (
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-lg"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            {backLabel}
          </Link>
        )}

        {actions && (
          <div className="flex flex-wrap items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}