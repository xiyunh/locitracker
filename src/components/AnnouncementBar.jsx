import { Link } from 'react-router-dom'

export default function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] w-full border-b border-white/5 bg-brand py-2.5 text-center text-[0.65rem] tracking-[0.2em] text-cream/85 uppercase">
      <p className="px-4">
        The world&apos;s first sticker tracker —{' '}
        <Link to="/pre-order" className="font-medium text-gold-light transition-colors hover:text-cream">
          pre order now
        </Link>
      </p>
    </div>
  )
}
