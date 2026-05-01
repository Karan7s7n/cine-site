import type { ReactNode } from 'react'

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative z-10 w-full overflow-hidden">
      {children}
    </main>
  )
}