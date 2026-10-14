import PageHeader from '../components/PageHeader'
import DayInLife from '../components/DayInLife'

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        label="Experience"
        title="A day with"
        emphasis="Loci"
        subtitle="See how Loci fits into real moments — from leaving home to landing at your gate."
      />
      <DayInLife />
    </>
  )
}
