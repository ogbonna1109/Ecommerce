import React from 'react'
import './Hero.css'
import hero1 from '../../../public/hero/hero1.jpeg'
import hero2 from '../../../public/hero/hero2.jpeg'
import hero3 from '../../../public/hero/hero3.jpeg'


const Hero = () => {
  return (
    <div className='hero-container'>
        {/* left side of the Hero */}
        <div className='hero-left-side'>
            <div className='hero-badge'>
                ✨NEW SEASON DROP
            </div>
            <h1>
                Discover Your <br />
                <span>Next Signature</span><br />
                Look
            </h1>
            <p>
                Handpicked premium thrift fashion that combines
                affordability, confidence and timeless style — curated for
                the modern generation.
            </p>
            <div className='hero-buttons'>
                <button className='shop-btn'>Shop Now →</button>
                <button className='explore-btn'>Explore Collection</button>
            </div>
            <div className='stats'>
                <div className='stat'>
                    <h2>12K+</h2>
                    <p>Happy Customer</p>
                </div>
                <div className='stat'>
                    <h2>3.5K+</h2>
                    <p>Curated Pieces</p>
                </div>
                <div className='stat'>
                    <h2>4.9∗</h2>
                    <p>Avg Rating</p>
                </div>
            </div>
        </div>
        {/* //Right side hero page */}
        <div className='hero-right-side'>
            <div className='background-image'>
                <img src={hero1} alt="background-image" />

                <div className='freshdrop-card'>
                    <span>✨</span>
                    <small>This week</small>
                    <h4>Fresh Drop</h4>
                </div>
                <div className='product-card1 product-card-top'>
                    <img src={hero2} alt="product-card1" />
                </div>
                <div className='product-card2 product-card-bottom'>
                    <img src={hero3} alt="product-card2" />
                </div>    
            </div>
            
        </div>
      
    </div>
  )
}

export default Hero
