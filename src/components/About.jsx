import React from 'react'
import './About.css'
import groceryImage from './Static/deiverygifimage.gif';
export default function About() {
  return (
    <div>
      <div className="app-container">
      <header className="header">
        <h1>About Us</h1>
      </header>
      <main className="about-content">
        <div className="about-text">
          <h2>Welcome to Mr Grocery!</h2>
          <p>
          Welcome to [Mr Grocery]! We're thrilled to bring the freshest groceries 
          and everyday essentials right to your doorstep in [vijayawada]. Born out of a desire
           to make shopping easier and more convenient for our community in , we're more than just 
           an online store – we're your neighbors committed to providing quality products and exceptional service.
          </p>
          <p>
          We understand that your time is valuable. That's why we've created a seamless online 
          experience, allowing you to browse our wide selection, place your order with ease, 
          and have it delivered at a time that suits you best. From farm-fresh produce and 
          locally sourced goods to pantry staples and household necessities, we've got 
          everything you need to keep your home running smoothly.
          </p>
        </div>
        <div className="about-image">
          <img src={groceryImage} alt="Grocery Shopping" />
        </div>
      </main>
      <footer className="footer">
        <p></p>
      </footer>
    </div>
    <div className="footer">
        <p className="legal-text">
              ALL RIGHTS ARE UNDER RESERVED © DINESH KARTHIK ALLA
            </p>
      </div>

    </div>
  )
}
