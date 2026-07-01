import type { ReactNode } from 'react';
import PageHeader from '../../../components/PageHeader';
import PageShell from '../../../components/PageShell';

interface StudyLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  variant?: 'selector' | 'session' | 'finished';
  backLabel?: string;
  onBack?: () => void;
}

export default function StudyLayout({
  children,
  title,
  subtitle,
  variant = 'session',
  backLabel = 'Volver al inicio',
  onBack,
}: StudyLayoutProps) {
  const isSession = variant === 'session';

  if (!isSession) {
    return (
      <PageShell size="narrow">
        <PageHeader
          title={title}
          subtitle={subtitle}
          backTo="/"
          backLabel={backLabel}
        />

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            {children}
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <>
      <div className="mx-auto mt-8 w-full max-w-5xl px-12">
        <PageHeader
          title={title}
          subtitle={subtitle}
          showDivider={false}
          actions={
            onBack ? (
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-violet-400"
              >
                ← {backLabel}
              </button>
            ) : undefined
          }
        />
      </div>

      <div className="flex flex-1 justify-center pt-3 pb-6">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </div>
    </>
  );
}