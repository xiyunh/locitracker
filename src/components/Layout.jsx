import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AnnouncementBar from './AnnouncementBar'
import Navbar from './Navbar'
import Footer from './Footer'
import Toast from './Toast'

export default function Layout() {
  const { pathname, hash } = useLocation()

  // new route: back to the top, unless a #hash names a section on the page
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        const id = window.setTimeout(() => target.scrollIntoView({ block: 'start', behavior: 'instant' }), 60)
        return () => window.clearTimeout(id)
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toast />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
