import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import StickerTag from './StickerTag'
import { Eyebrow } from './ui'
import { posts } from '../data/blog'

export default function Blog() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i === 0 ? posts.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === posts.length - 1 ? 0 : i + 1))

  return (
    <section className="border-t border-white/5 bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal variant="up">
          <Eyebrow>From the blog</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.02] font-medium text-cream sm:text-6xl">
            Notes from building Loci.
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fade" delay={1} className="marquee mt-12 overflow-hidden border-y border-white/10 py-5">
          <div className="marquee-track">
            {[...posts, ...posts].map((p, i) => (
              <span
                key={`${p.slug}-${i}`}
                className="flex items-center gap-10 pr-10 font-display text-2xl text-cream/70 italic"
              >
                {p.tag}
                <span className="h-1.5 w-1.5 rounded-full bg-gold/70" aria-hidden="true" />
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal key={index} variant="right" delay={0}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand to-charcoal-mid">
              <div className="absolute inset-0 flex items-center justify-center">
                <StickerTag size={150} peel />
              </div>
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-charcoal to-transparent p-6">
                <span className="text-xs tracking-widest text-gold uppercase">
                  Featured Post
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="left" delay={1}>
            <motion.div
              key={`post-${index}`}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <p className="text-sm text-cream-muted">
                {posts[index].tag} · {posts[index].date}
              </p>
              <h3 className="mt-3 font-display text-3xl leading-[1.1] font-medium text-cream lg:text-4xl">
                {posts[index].title}
              </h3>
              <Link
                to="/blog"
                className="mt-6 inline-block text-sm text-cream underline-offset-4 hover:underline"
              >
                Read More
              </Link>
            </motion.div>

            <ScrollReveal variant="up" delay={2} className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous post"
                className="glass-soft rounded-md p-3 text-cream-muted transition-colors hover:border-gold/30 hover:text-cream"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next post"
                className="glass-soft rounded-md p-3 text-cream-muted transition-colors hover:border-gold/30 hover:text-cream"
              >
                <ChevronRight size={18} />
              </button>
              <div className="ml-4 flex gap-2">
                {posts.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to post ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? 'w-8 bg-gold' : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </ScrollReveal>

            <ul className="mt-10 hidden space-y-3 border-t border-white/5 pt-8 lg:block">
              {posts.map((p, i) => (
                <ScrollReveal key={p.slug} as="li" variant="left" delay={i + 3}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`text-left text-sm transition-colors ${
                      i === index ? 'text-cream' : 'text-cream-muted hover:text-cream'
                    }`}
                  >
                    <span className="text-cream-muted">{p.tag}: </span>
                    {p.title}
                  </button>
                </ScrollReveal>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
