import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import Placeholder from '../components/Placeholder'
import { posts } from '../data/blog'

export default function BlogPage() {
  return (
    <div className="bg-charcoal">
      <PageHeader
        eyebrow="Blog"
        title="Notes from building Loci."
        copy="Engineering, design, and the occasional failed prototype — written by the people making the sticker."
      />
      <div className="mx-auto max-w-3xl space-y-24 px-6 pb-28 lg:px-0">
        {posts.map((post, i) => (
          <ScrollReveal key={post.slug} as="article" variant="up" delay={i} id={post.slug} className="scroll-mt-28">
            <p className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">
              {post.tag} · {post.date}
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.08] font-medium text-cream">
              {post.title}
            </h2>
            <Placeholder label={post.imageNote} aspect="aspect-[16/9]" className="mt-8" />
            <div className="mt-8 space-y-5">
              {post.body.map((para) => (
                <p key={para.slice(0, 24)} className="text-base leading-relaxed text-cream/70">
                  {para}
                </p>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
