import { ImageIcon } from 'lucide-react'

/**
 * Marked slot for a real photo that still needs to be shot.
 * Keeps layout honest while the asset list gets filled in.
 */
export default function Placeholder({ label, aspect = 'aspect-[4/3]', className = '' }) {
  return (
    <div
      className={`relative flex ${aspect} w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed border-cream/20 bg-cream/[0.03] ${className}`}
    >
      <ImageIcon size={22} strokeWidth={1.2} className="text-cream/35" />
      <p className="max-w-[80%] text-center font-display text-[0.6rem] leading-relaxed tracking-[0.2em] text-cream/40 uppercase">
        {label}
      </p>
    </div>
  )
}
