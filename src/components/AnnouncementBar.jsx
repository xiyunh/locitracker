import { Link } from 'react-router-dom'

export default function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] w-full border-b border-white/5 bg-brand py-2.5 text-center text-[0.65rem] tracking-[0.2em] text-[#f5f0e8]/85 uppercase">
      <p className="px-4">
        The world&apos;s first sticker tracker —{' '}
        <Link to="/pre-order" className="font-medium text-[#d7bda2] transition-colors hover:text-white">
          pre order now
        </Link>
      </p>
    </div>
  )
}
