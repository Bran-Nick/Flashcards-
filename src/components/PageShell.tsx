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
      className={`mx-auto w-full ${maxWidth} px-6 py-10 flex flex-col space-y-8`}
    >
      {children}
    </div>
  );
}