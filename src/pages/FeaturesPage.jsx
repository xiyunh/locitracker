import PageHeader from '../components/PageHeader'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Membership from '../components/Membership'

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        label="Why LOCI"
        title="Built to"
        emphasis="find anything"
        subtitle="Sticker-thin design, the Loci network, and privacy built in from day one."
      />
      <Features />
      <HowItWorks />
      <Membership />
    </>
  )
}
