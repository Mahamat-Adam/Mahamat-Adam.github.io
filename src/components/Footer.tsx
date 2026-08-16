export function Footer() {
  return (
    <footer className="border-t border-line pb-48 pt-8 sm:py-8 dark:border-nline">
      {/* extra right padding keeps the credit clear of the floating chat button */}
      <div className="mx-auto flex max-w-wrap flex-col items-center justify-between gap-3 px-5 sm:flex-row sm:pr-24 md:px-8 md:pr-24 xl:pr-8">
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          © 2026 Mahamat Adam. All rights reserved.
        </p>
        <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
          Built with React, TypeScript & Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
