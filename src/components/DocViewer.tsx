import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, X } from 'lucide-react'

type Props = {
  title: string
  /** rendered page image shown in the viewer */
  image: string
  /** the original PDF; when set, a download button appears in the header */
  file?: string
  onClose: () => void
}

export function DocViewer({ title, image, file, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 24, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 24, scale: 0.98 }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-card dark:border-nline dark:bg-panel"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 dark:border-nline">
          <p className="font-display text-sm font-bold">{title}</p>
          <div className="flex items-center gap-2">
            {file && (
              <a
                href={file}
                download
                className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <Download size={13} /> Download PDF
              </a>
            )}
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close viewer"
              className="rounded-full border border-line p-2 text-zinc-600 transition-colors hover:border-accent hover:text-accentInk dark:hover:text-accentSoft dark:border-nline dark:text-zinc-300"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto bg-zinc-100 p-3 dark:bg-night sm:p-5">
          <img src={image} alt={title} className="mx-auto w-full max-w-2xl rounded-md shadow-lg" />
        </div>
      </motion.div>
    </motion.div>
  )
}
