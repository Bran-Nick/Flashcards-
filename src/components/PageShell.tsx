import type { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
  size?: 'default' | 'wide' | 'narrow';
}

export default function PageShell({
  children,
  size = "default",
}: PageShellProps) {
  const maxWidth = {
    narrow: "max-w-4xl",
    default: "max-w-6xl",
    wide: "max-w-[86rem]",
  }[size];

  return (
    <div
      className={`mx-auto w-full ${maxWidth} px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 flex flex-col space-y-8`}
    >
      {children}
    </div>
  );
}