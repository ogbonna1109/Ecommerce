import React from 'react'
import './Categories.css'
import ladyBagDesign from '/bags/lady-bag-design.webp'
import jws from '/accessories/jws.webp'
import faceCap from '/hats/face-cap.webp'
import perfume from '/perfume/9perfume.png'
import deepBlue from '/clothes/DeepBlue.png'
import sportwear from '/sportswear/sportwear1.webp'

const Categories = () => {
  return (
    <section>
      <div className=''>
        <div className=''>
          <h5>
            <span>SHOP BY CATEGORY</span><br />
            Find Your Style
          </h5>
          </div>
          <div className='view-categories'>
            <h5>
              View All Categories →
            </h5>
          </div>
      </div>
      
      <div>
        <img src={deepBlue} alt="deep blue dress" />
        <p>Ladies dresses</p>
      </div>
      <div>
        <img src={ladyBagDesign} alt="ladyBagDesign" />
        <p>Ladies Bags</p>
      </div>
      <div>
        <img src={faceCap} alt="faceCap" />
        <p>Face Cap</p>
      </div>
      <div>
        <img src={sportwear} alt="sportwear" />
        <p>Sport Dresses</p>
      </div>
      <div>
        <img src={perfume} alt="Perfume" />
        <p>Perfume</p>
      </div>
      <div>
        <img src={jws} alt="jws" />
        <p>Accessories</p>
      </div>
    </section>
  )
}

export default Categories
