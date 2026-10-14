import { ArrowRight, Boxes, Briefcase, Truck } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import Placeholder from '../components/Placeholder'
import Waitlist from '../components/Waitlist'
import { Button, SectionHeading } from '../components/ui'

const useCases = [
  {
    icon: Briefcase,
    title: 'Equipment & tools',
    text: 'Stick a Loci on shared gear — cameras, kits, power tools — and see where everything ended up at the close of the day.',
    photo: 'PHOTO — tagged toolkit in a workshop',
  },
  {
    icon: Truck,
    title: 'Fleet & logistics',
    text: 'Crates, cases, and pallets move between sites. Thin tags that survive handling keep every container accounted for.',
    photo: 'PHOTO — tagged flight case being loaded',
  },
  {
    icon: Boxes,
    title: 'IT & office assets',
    text: 'Laptops, loaner devices, demo units. Tag the things that walk away, and reclaim the audit week nobody enjoys.',
    photo: 'PHOTO — asset drawer with tagged devices',
  },
]

export default function EnterprisePage() {
  return (
    <>
      <PageHeader
        label="For enterprises"
        title="Loci for"
        emphasis="business."
        subtitle="The same sticker-thin tracker, applied to the stuff your team can't afford to lose — tools, cases, and shared equipment."
      />

      <section className="bg-charcoal py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {useCases.map(({ icon: Icon, title, text, photo }, i) => (
              <ScrollReveal
                key={title}
                variant="up"
                delay={i}
                className="glass card-lift flex flex-col rounded-2xl p-7 hover:border-gold/30"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/50 text-gold-light ring-1 ring-white/10">
                  <Icon size={21} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-3xl font-medium text-cream">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{text}</p>
                <Placeholder label={photo} aspect="aspect-[16/10]" className="mt-6" />
              </ScrollReveal>
            ))}
          </div>

          <div className="glass mt-20 grid gap-10 rounded-2xl p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-12">
            <SectionHeading
              eyebrow="Pilot program"
              title="Put Loci on your fleet before launch."
              copy="We're onboarding a small group of teams for the first production run — volume packs, direct support, and a say in what the dashboard becomes. No procurement maze; just a conversation."
            />
            <ScrollReveal variant="left" delay={1} className="flex flex-col gap-4 lg:items-end">
              <ul className="space-y-2 text-sm text-cream/70">
                <li>— Volume pricing on 25+ units</li>
                <li>— Priority allocation from the first drop</li>
                <li>— Direct line to the team building it</li>
              </ul>
              <Button href="#waitlist" size="lg" className="group mt-2 w-fit">
                Join the pilot
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div id="waitlist">
        <Waitlist />
      </div>
    </>
  )
}
