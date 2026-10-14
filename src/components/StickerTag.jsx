/**
 * The Loci Sticker: a thin, rounded-square adhesive tracker. Rendered in CSS with
 * percentage-based internals so it scales from cart thumbnails to the hero.
 * Pass `size` for a fixed pixel size, or a className with w-/h- utilities.
 */
export default function StickerTag({ size, peel = false, sheen = false, className = '', style }) {
  const dimensions = size ? { width: size, height: size } : {}

  return (
    <div className={`relative shrink-0 ${className}`} style={{ ...dimensions, ...style }}>
      {/* Edge / adhesive layer gives the slab its thickness */}
      <div className="absolute inset-0 translate-y-[6%] rounded-[24%] bg-gradient-to-b from-brand-light/70 to-brand" />

      {/* Top face */}
      <div className={`absolute inset-0 overflow-hidden rounded-[24%] bg-gradient-to-br from-white via-gray-100 to-gray-300 shadow-[0_12px_30px_rgba(0,0,0,0.35)] ring-1 ring-gold/25 ${sheen ? 'sheen' : ''}`}>
        <div className="absolute inset-[9%] rounded-[20%] border border-brand/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex aspect-square w-[40%] items-center justify-center rounded-full bg-brand shadow-md ring-2 ring-gold/40">
            <div className="absolute aspect-square w-[62%] rounded-full border border-gold/40" />
            <div className="aspect-square w-[20%] rounded-full bg-gold shadow-[0_0_12px_rgba(210,180,120,0.8)]" />
          </div>
        </div>
        {/* Specular highlight */}
        <div className="absolute inset-x-[12%] top-[8%] h-[16%] rounded-full bg-white/55 blur-[2px]" />
      </div>

      {/* Peeled corner */}
      {peel && (
        <div
          className="absolute right-0 bottom-0 aspect-square w-[24%] translate-x-[2%] translate-y-[2%] bg-gradient-to-tl from-gray-400 via-gray-100 to-white shadow-[-6px_-6px_16px_rgba(0,0,0,0.25)]"
          style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
        />
      )}
    </div>
  )
}
