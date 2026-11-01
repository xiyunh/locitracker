import { ArrowRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import Placeholder from './Placeholder'
import { Button, SectionHeading } from './ui'

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-transparent via-[#d9e0ee]/80 to-transparent py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <SectionHeading
          align="center"
          eyebrow="Simple setup"
          title={
            <>
              Stick it on. Track it down. <em className="text-gold">That&apos;s it.</em>
            </>
          }
          copy="Peel, stick, and hold Loci near your phone — it pairs in a tap. Then use the Loci app to see your item on a map, play a sound, or follow distance cues when it is close by."
        />
        <ScrollReveal variant="fade" delay={1} className="mt-12">
          <Placeholder
            label="Photo — three-frame sequence: peeling the sticker, pressing it onto a laptop sleeve, phone showing it paired"
            aspect="aspect-[21/9]"
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-8 border-t border-cream/10 pt-10 text-left sm:grid-cols-3">
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
