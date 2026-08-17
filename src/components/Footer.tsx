export function Footer() {
  const ui = useUi()
  return (
    <footer className="border-t border-line pb-48 pt-8 sm:py-8 dark:border-nline">
      <div className="mx-auto max-w-wrap px-5 md:px-8">
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-300">{ui.footer.thanks}</p>
        {/* extra right padding keeps the credit clear of the floating chat button */}
        <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row sm:pe-24 md:pe-24 xl:pe-8">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">{ui.footer.rights}</p>
          <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            {ui.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  )
}
import { useUi } from '../data/ui'
