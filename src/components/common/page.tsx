import { ReactNode } from 'react';

export default function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`w-full h-full flex bg-light-primary px-10 py-6 ${className}`}>{children}</div>;
}
