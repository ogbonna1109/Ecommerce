import React from 'react'
import { Link } from "react-router-dom";
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
      <div className='categories'>
        <div className='categories-header'>
        <div className='categories-header-left'>
          <span>SHOP BY CATEGORY</span><br />
          <h5>Find Your Style</h5>
        </div>
          <div className='categories-header-right'>
            <h5>
              <Link to='/Categories' >View All Categories →</Link>
            </h5>
          </div>
      </div>
      
      <div className='categories-grid'>
        <div className='category-card'>
        <img src={deepBlue} alt="deep blue dress" />
        
        <div className='category-overlay'>
          <h4>Ladies dresses</h4>
          <p>12 Items</p>
        </div>
      </div>
      <div className='category-card'>
        <img src={ladyBagDesign} alt="ladyBagDesign" />
        <div className='category-overlay'>
          <h4>Ladies Bags</h4>
          <p>19 Items</p>
        </div>
      </div>
      <div className='category-card'>
        <img src={faceCap} alt="faceCap" />
        <p>Face Cap</p>
        <div className='category-overlay'>
          <h4>Face Cap</h4>
          <p>17 Items</p>
        </div>
      </div>
      <div className='category-card'>
        <img src={sportwear} alt="sportwear" />
        <div className='category-overlay'>
          <h4>sport Dresses</h4>
          <p>15 Items</p>
        </div>
      </div>
      <div className='category-card'>
        <img src={perfume} alt="Perfume" />
        <div className='category-overlay'>
          <h4>Perfume</h4>
          <p>12 Items</p>
        </div>
      </div>
      <div className='category-card'>
        <img src={jws} alt="jws" />
        <p>Accessories</p>
      </div>
    </div>
      </div>
  </section>
  )
}

export default Categories
