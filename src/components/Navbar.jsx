import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ShoppingBag, ChevronDown, ArrowRight, UserRound } from 'lucide-react'
import { navItems } from '../data/navMenu'
import BrandLogo from './BrandLogo'
import StickerTag from './StickerTag'
import { useStore } from '../context/store'
import { buttonClass, iconButtonClass } from '../lib/ui'

function DropdownPanel({ item }) {
  return (
    <motion.div
      key="mega-panel"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full right-0 left-0 z-50 origin-top"
      role="menu"
      aria-label={`${item.label} menu`}
    >
      <div className="border-b border-white/12 bg-white shadow-[0_40px_80px_rgba(23,37,60,0.18)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-10"
          >
            {/* Links */}
            <ul className="flex flex-col justify-center">
              {item.links.map((link) => (
                <li key={link.label}>
                  <MenuLink
                    link={link}
                    role="menuitem"
                    className="group/link -mx-4 flex items-center justify-between gap-6 rounded-lg px-4 py-3.5 transition-colors duration-200 hover:bg-[#eef2f9]"
                  >
                    <span className="min-w-0">
                      <span className="flex items-baseline gap-3">
                        <span className="font-display text-[1.65rem] leading-tight font-medium text-cream/85 transition-colors duration-200 group-hover/link:text-cream">
                          {link.label}
                        </span>
                        {link.price && (
                          <span className="text-sm font-medium text-gold">{link.price}</span>
                        )}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-cream-muted transition-colors duration-200 group-hover/link:text-cream/70">
                        {link.description}
                      </span>
                    </span>
                    <ArrowRight
                      size={18}
                      className="shrink-0 -translate-x-2 text-gold opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100"
                    />
                  </MenuLink>
                </li>
              ))}
            </ul>

            {/* Feature card */}
            <Link
              to={item.to}
              className="group/card relative hidden min-h-[19rem] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-white p-7 transition-colors duration-300 hover:border-gold/30 lg:flex"
            >
              <div className="absolute -top-10 -right-8 h-52 w-52 rounded-full bg-gradient-to-br from-gold/25 via-brand-light/25 to-transparent blur-3xl" />
              <div className="absolute top-8 right-9 transition-transform duration-500 group-hover/card:-translate-y-1 group-hover/card:scale-[1.04]">
                <StickerTag peel className="h-32 w-32 drop-shadow-[0_20px_36px_rgba(0,0,0,0.5)]" />
              </div>

              <p className="text-[0.7rem] font-medium tracking-[0.25em] text-gold">
                {item.label}
              </p>
              <p className="mt-3 max-w-[17rem] font-display text-2xl leading-snug font-medium text-cream">
                {item.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-light transition-colors group-hover/card:text-cream">
                Explore {item.label}
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover/card:translate-x-1"
                />
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/** Menu entries are in-app routes, except booking links which open Calendly in a new tab. */
function MenuLink({ link, children, ...props }) {
  if (link.href) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  }
  return (
    <Link to={link.to} {...props}>
      {children}
    </Link>
  )
}

function DesktopNavItem({ item, isActive, onActivate }) {
  return (
    <li>
      <NavLink
        to={item.to}
        className={({ isActive: isRouteActive }) =>
          `inline-flex items-center gap-1.5 py-2 text-[0.8rem] font-medium tracking-[0.08em] transition-colors ${
            isActive || isRouteActive
              ? 'text-gold-light'
              : 'text-cream-muted hover:text-gold-light'
          }`
        }
        onMouseEnter={onActivate}
        onFocus={onActivate}
      >
        {item.label}
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
        />
      </NavLink>
    </li>
  )
}

function MobileNavSection({ item, onNavigate }) {
  const [open, setOpen] = useState(false)

  return (
    <li className="border-b border-white/10 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left font-display text-2xl text-cream"
      >
        {item.label}
        <ChevronDown
          size={18}
          className={`text-cream-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="pb-4">
          <p className="mb-3 text-sm leading-relaxed text-cream/60">{item.summary}</p>
          <ul className="space-y-1">
            {item.links.map((link) => (
              <li key={link.label}>
                <MenuLink
                  link={link}
                  onClick={onNavigate}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-cream/80 transition-colors hover:bg-white/5 hover:text-cream"
                >
                  <span>
                    {link.label}
                    {link.price && (
                      <span className="ml-2 text-gold">{link.price}</span>
                    )}
                  </span>
                  <ArrowRight size={14} className="text-cream-muted" />
                </MenuLink>
              </li>
            ))}
          </ul>
          <Link
            to={item.to}
            onClick={onNavigate}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold-light"
          >
            View all {item.label}
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </li>
  )
}

export default function Navbar() {
  const location = useLocation()
  const { account, itemCount } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const closeTimer = useRef(null)

  const openMenu = (label) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setActiveMenu(label)
  }

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 140)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setActiveMenu(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => {
      setMenuOpen(false)
      setActiveMenu(null)
    }, 0)

    return () => window.clearTimeout(id)
  }, [location.pathname])

  const closeMobile = () => setMenuOpen(false)
  const activeItem = navItems.find((item) => item.label === activeMenu)

  return (
    <>
      <AnimatePresence>
        {activeItem && (
          <motion.div
            key="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xl"
            onMouseEnter={() => setActiveMenu(null)}
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>
    <header
      className={`fixed top-9 right-0 left-0 z-50 transition-[box-shadow,backdrop-filter] duration-300 ${
        scrolled || menuOpen || activeMenu
          ? 'bg-white shadow-md shadow-black/5'
          : 'bg-transparent'
      }`}
      onMouseEnter={() => {
        if (closeTimer.current) window.clearTimeout(closeTimer.current)
      }}
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setActiveMenu(null)
        }
      }}
    >
      {/* Dimmed, blurred page behind the open menu (Oura-style) */}
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="inline-flex items-center" aria-label="Loci home">
          <BrandLogo />
        </Link>

        <ul className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex md:gap-8">
          {navItems.map((item) => (
            <DesktopNavItem
              key={item.label}
              item={item}
              isActive={activeMenu === item.label}
              onActivate={() => openMenu(item.label)}
            />
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <Link
            to={account ? '/account' : '/join'}
            aria-label={account ? 'Account' : 'Create an account'}
            className={iconButtonClass}
          >
            <UserRound size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/cart" aria-label="Cart" className={`${iconButtonClass} relative`}>
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[0.65rem] leading-none font-medium text-brand">
                {itemCount}
              </span>
            )}
          </Link>
          <Link to="/pre-order" className={buttonClass('primary', 'sm', 'ml-2 hidden sm:inline-flex')}>
            Pre Order
          </Link>
          <button
            type="button"
            aria-label="Menu"
            className={`${iconButtonClass} text-cream md:hidden`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>{activeItem && <DropdownPanel item={activeItem} />}</AnimatePresence>

      {menuOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 bg-brand/80 px-6 backdrop-blur-xl py-2 md:hidden">
          <ul>
            {navItems.map((item) => (
              <MobileNavSection key={item.label} item={item} onNavigate={closeMobile} />
            ))}
          </ul>
          <Link to="/pre-order" onClick={closeMobile} className={buttonClass('primary', 'md', 'my-4 w-full')}>
            Pre Order
          </Link>
        </div>
      )}

    </header>
    </>
  )
}
