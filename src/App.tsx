import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import EarlyAccessModal from './components/EarlyAccessModal'

function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Navbar onRequestAccess={() => setModalOpen(true)} />
      <Hero onRequestAccess={() => setModalOpen(true)} />
      <Features />
      <Testimonials />
      <Footer onRequestAccess={() => setModalOpen(true)} />
      <EarlyAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}

export default App
