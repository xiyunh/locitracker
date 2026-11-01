import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import Placeholder from './Placeholder'
import { Eyebrow } from './ui'

function SpecRow({ items }) {
  return (
    <p className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.65rem] font-medium tracking-[0.25em] text-cream-muted uppercase">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-4">
          {i > 0 && <span className="h-1 w-1 rounded-full bg-gold/60" aria-hidden="true" />}
          {item}
        </span>
      ))}
    </p>
  )
}

function Row({ image, eyebrow, title, children, reversed = false, specs }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <ScrollReveal
        variant={reversed ? 'right' : 'left'}
        className={reversed ? 'lg:order-2' : ''}
      >
        {image}
      </ScrollReveal>
      <ScrollReveal
        variant={reversed ? 'left' : 'right'}
        delay={1}
        className={reversed ? 'lg:order-1' : ''}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-md font-display text-4xl leading-[1.02] font-medium text-cream lg:text-5xl">
          {title}
        </h2>
        <div className="mt-5 max-w-md space-y-4 text-[15px] leading-relaxed text-cream-muted">
          {children}
        </div>
        {specs && <SpecRow items={specs} />}
      </ScrollReveal>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-24 px-6 lg:space-y-32 lg:px-10">
        <Row
          eyebrow="Sticks to anything"
          title={
            <>
              Thin enough to <em className="text-gold">disappear.</em>
            </>
          }
          image={
            <Placeholder
              label="Photo — macro close-up: a fingertip peeling a Loci sticker from its backing card, soft daylight"
              aspect="aspect-[4/5]"
            />
          }
          specs={['<2 mm thin', '22 months battery', 'Re-stickable']}
        >
          <p>
            Loci is not a tag you clip on — it is a sticker you press on. At under two
            millimeters it slips inside a passport cover, under a laptop, behind a remote,
            places a bulky tracker could never go.
          </p>
          <p>
            Peel it, stick it, and forget it is there until the moment you need it.
          </p>
        </Row>

        {/* Pull quote — a breath between rows */}
        <ScrollReveal variant="fade" className="mx-auto max-w-3xl text-center">
          <span className="hairline-gold mx-auto block w-16" aria-hidden="true" />
          <p className="mt-8 font-display text-3xl leading-tight font-medium text-cream sm:text-4xl lg:text-5xl">
            It doesn&apos;t clip on. <em className="text-gold">It sticks on.</em>
          </p>
          <span className="hairline-gold mx-auto mt-8 block w-16" aria-hidden="true" />
        </ScrollReveal>

        <Row
          reversed
          eyebrow="Everyday carry"
          title={
            <>
              Never wonder where your <em className="text-gold">things went.</em>
            </>
          }
          image={
            <Placeholder
              label="Photo — lifestyle flat-lay: keys, wallet, passport and headphones on an entry table, Loci stickers just visible"
              aspect="aspect-[4/3]"
            />
          }
        >
          <p>
            Keys on the counter, a wallet in yesterday&apos;s jacket, luggage somewhere
            between check-in and the carousel, the pet carrier, the bike in the garage —
            if it leaves the house with you, a Loci can bring it back.
          </p>
          <p>
            Share anything with family and friends, so the people who borrow your things
            can find them too.
          </p>
        </Row>

        <Row
          eyebrow="The Loci network"
          title={
            <>
              Found, even <em className="text-gold">far away.</em>
            </>
          }
          image={
            <Placeholder
              label="Photo — hand holding a phone with the Loci app map open, evening city bokeh behind"
              aspect="aspect-[4/5]"
            />
          }
        >
          <p>
            Nearby, the Loci app guides you with sound and distance cues. Farther out, the
            Loci network quietly relays an item&apos;s last known location back to you —
            encrypted and anonymous the whole way.
          </p>
          <p className="text-sm">
            Private by design.{' '}
            <Link to="/privacy" className="text-gold underline-offset-4 hover:underline">
              Read how we handle data
            </Link>
            .
          </p>
        </Row>
      </div>
    </section>
  )
}
