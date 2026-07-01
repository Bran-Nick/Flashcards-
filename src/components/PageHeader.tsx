import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: ReactNode;
  backTo?: string;
  backLabel?: string;
  actions?: ReactNode;
  showDivider?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  backTo,
  backLabel = 'Volver al inicio',
  actions,
  showDivider = true,
}: PageHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-6 pb-6 md:flex-row md:items-start md:justify-between ${
        showDivider ? 'border-b border-slate-200 dark:border-slate-700' : ''
      }`}
    >
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          {title}
        </h1>

        {subtitle && (
          <div className="mt-2 text-slate-400">
            {subtitle}
          </div>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-start gap-4 md:items-end">
        {backTo && (
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-violet-400"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </Link>
        )}

        {actions && (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}