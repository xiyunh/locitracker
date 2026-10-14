import PageHeader from '../components/PageHeader'
import Products from '../components/Products'

export default function ShopPage() {
  return (
    <>
      <PageHeader
        label="Shop"
        title="The Loci"
        emphasis="Sticker"
        subtitle="Peel, stick, and pair with the Loci app. Track keys, passports, luggage, and everything that matters."
      />
      <Products />
    </>
  )
}
