import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useStore } from '../context/store'

export default function Toast() {
  const { toast, dismissToast } = useStore()

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(dismissToast, 4200)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast?.id])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-live="polite"
          className="fixed right-6 bottom-6 z-[90] flex max-w-sm items-start gap-3 rounded-xl border border-gold/25 bg-charcoal-mid/95 p-4 pr-6 shadow-2xl shadow-black/50 backdrop-blur-md"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold-light" />
          <div>
            <p className="font-display text-lg leading-tight font-medium text-cream">{toast.title}</p>
            {toast.message && (
              <p className="mt-1 text-xs leading-relaxed text-cream/60">{toast.message}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
