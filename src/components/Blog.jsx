import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import Placeholder from './Placeholder'
import { Eyebrow } from './ui'
import { posts } from '../data/blog'

export default function Blog() {
  const [featured, ...rest] = posts

  return (
    <section className="border-t border-white/5 bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal variant="up">
          <Eyebrow>From the blog</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.02] font-medium text-cream sm:text-6xl">
            Notes from building Loci.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
          <ScrollReveal variant="right" delay={1}>
            <Link to="/blog" className="group block">
              <Placeholder label={featured.imageNote} aspect="aspect-[4/3]" />
              <p className="mt-6 text-[0.65rem] tracking-[0.3em] text-gold uppercase">
                {featured.tag} · {featured.date}
              </p>
              <h3 className="mt-3 font-display text-3xl leading-[1.12] font-medium text-cream transition-colors group-hover:text-gold-light lg:text-4xl">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/60">{featured.excerpt}</p>
            </Link>
          </ScrollReveal>

          <ScrollReveal variant="left" delay={2}>
            <ul className="divide-y divide-white/5 border-y border-white/5">
              {rest.map((post) => (
                <li key={post.slug}>
                  <Link to="/blog" className="group block py-7">
                    <p className="text-[0.62rem] tracking-[0.3em] text-cream-muted uppercase">
                      {post.tag} · {post.date}
                    </p>
                    <h4 className="mt-2 font-display text-xl leading-snug font-medium text-cream transition-colors group-hover:text-gold-light">
                      {post.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-cream/55">{post.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/blog"
              className="group mt-8 inline-flex items-center gap-2 text-sm text-cream underline-offset-4 hover:underline"
            >
              Read the blog
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
