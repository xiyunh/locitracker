import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import FeaturesPage from './pages/FeaturesPage'
import ExperiencePage from './pages/ExperiencePage'
import PreOrderPage from './pages/PreOrderPage'
import CartPage from './pages/CartPage'
import LegalPage from './pages/LegalPage'
import AccountPage from './pages/AccountPage'
import VerifiedPage from './pages/VerifiedPage'
import { StoreProvider } from './context/StoreContext'

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="pre-order" element={<PreOrderPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="terms" element={<LegalPage page="terms" />} />
          <Route path="privacy" element={<LegalPage page="privacy" />} />
          <Route path="accessibility" element={<LegalPage page="accessibility" />} />
          <Route path="returns" element={<LegalPage page="returns" />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="verified" element={<VerifiedPage />} />
        </Route>
      </Routes>
    </StoreProvider>
  )
}
