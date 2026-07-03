import type { ReactNode } from 'react';
import PageHeader from '../../../components/PageHeader';
import PageShell from '../../../components/PageShell';

interface StudyLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  mobileSubtitle?: React.ReactNode;
  variant?: 'selector' | 'session' | 'finished';
  backLabel?: string;
  onBack?: () => void;
}

export default function StudyLayout({
  children,
  title,
  subtitle,
  mobileSubtitle,
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
          mobileSubtitle={mobileSubtitle}
          backTo="/"
          backLabel={backLabel}
        />

        <main
          role="region"
          aria-labelledby="study-layout-title"
          className="flex justify-center"
        >
          <div className="w-full max-w-4xl">
            {children}
          </div>
        </main>
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
          variant="session"
          actions={
            onBack ? (
              <button
                onClick={onBack}
                aria-label={backLabel}
                className={`inline-flex items-center gap-2 font-semibold text-slate-400 transition-colors hover:text-violet-400 rounded-md
          ${variant === 'session' ? 'text-xs sm:text-sm' : 'text-sm'}`}
              >
                ← {backLabel}
              </button>
            ) : undefined
          }
        />
      </div>

      <main
        role="region"
        aria-labelledby="study-layout-title"
        className="flex flex-1 justify-center pt-3 pb-6"
      >
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </main>
    </>
  );
}
