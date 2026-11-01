import Hero from '../components/Hero'
import Membership from '../components/Membership'
import DeviceAppShowcase from '../components/DeviceAppShowcase'
import Learn from '../components/Learn'
import Waitlist from '../components/Waitlist'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Membership />
      <DeviceAppShowcase />
      <Learn />
      <Waitlist />
    </>
  )
}
