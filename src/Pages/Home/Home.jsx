import React from 'react'
import Hero from '../../Components/Hero/Hero.jsx'
import Stats from './stats/Stats.jsx'
import FeaturedCollections from './FeaturedCollections/FeatureCollections.jsx'
import NewArrivals from './NewArrivals/NewArrivals.jsx'
import PromoBanner from './PromoBanner/PromoBanner.jsx'
import TrustSection from './TrustSection/TrustSection.jsx'
import Footer from '../../Components/Footer/Footer.jsx'

const Home = () => {
  return (
    <main>
      <Hero />
      <Stats />
      <FeaturedCollections />
      <NewArrivals />
      <PromoBanner />
      <TrustSection />
      <Footer />

    </main>
  )
}

export default Home