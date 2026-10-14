import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import { badgeClass } from '../lib/ui'

const accessories = [
  {
    name: 'Adhesive Refill Pack',
    price: '$12',
    description: 'Six fresh pads. Move a Loci from one item to the next.',
  },
  {
    name: 'Loci Key Fob',
    price: '$25',
    description: 'Slim stainless steel fob that turns a sticker into a key ring.',
  },
  {
    name: 'Loci Leather Fob',
    price: '$39',
    description: 'Leather sleeve with a polished steel ring.',
  },
  {
    name: 'Loci Sticker 4 Pack',
    price: '$99',
    description: 'Four stickers — save $17 vs buying singles.',
    badge: 'Best value',
  },
]

export default function AccessoriesPage() {
  return (
    <>
      <PageHeader
        label="Accessories"
        title="Complete your"
        emphasis="setup"
        subtitle="Refills, fobs, and bundles that take a Loci from sticker to key ring."
      />
      <section className="bg-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {accessories.map((item, i) => (
              <ScrollReveal
                key={item.name}
                to="/shop"
                variant="up"
                delay={i}
                className="card-lift group flex flex-col justify-between rounded-2xl border border-white/10 bg-charcoal-mid p-8 hover:border-gold/30"
              >
                {item.badge && (
                  <span className={`${badgeClass} mb-4 w-fit`}>
                    {item.badge}
                  </span>
                )}
                <div>
                  <h3 className="font-display text-3xl font-medium text-cream">{item.name}</h3>
                  <p className="mt-2 text-sm text-cream-muted">{item.description}</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-lg text-gold">{item.price}</span>
                  <span className="text-xs tracking-widest text-cream-muted uppercase transition-colors group-hover:text-cream">
                    View in shop →
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
