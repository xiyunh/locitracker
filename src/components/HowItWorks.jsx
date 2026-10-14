import { ArrowRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { Button, SectionHeading } from './ui'

export default function HowItWorks() {
  return (
    <section className="border-t border-white/5 bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <SectionHeading
          align="center"
          eyebrow="Simple setup"
          title={
            <>
              Stick it on. Track it down. <em className="text-gold-light">That&apos;s it.</em>
            </>
          }
          copy="Peel, stick, and hold Loci near your phone — it pairs in a tap. Then use the Loci app to see your item on a map, play a sound, or follow distance cues when it is close by."
        />
        <div className="mt-14 grid gap-8 border-t border-white/10 pt-10 text-left sm:grid-cols-3">
          {[
            ['01', 'Peel & stick', 'Onto keys, a passport, a remote, a bag.'],
            ['02', 'Tap to pair', 'Hold it near your phone. Done in a tap.'],
            ['03', 'Find anything', 'Map, sound, and distance cues in the Loci app.'],
          ].map(([n, title, copy], i) => (
            <ScrollReveal key={n} variant="up" delay={i + 1} className="flex gap-5">
              <span className="numeral">{n}</span>
              <span>
                <span className="block font-display text-2xl font-medium text-cream">{title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-cream/60">{copy}</span>
              </span>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal variant="fade" delay={4} className="mt-12">
          <Button to="/experience" variant="ghost" size="none" className="text-sm">
            See it in action
            <ArrowRight size={15} />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
