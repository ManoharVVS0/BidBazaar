import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        {/* <img src="/logo.png" alt="Auction Logo" className="logo" /> */}
        <h1>Welcome to the Online Auction Platform</h1>
        <p>Where your bids make a difference! Join us to buy and sell unique items.</p>
      </header>

      <section className="how-it-works">
        <h2>How Does This Auction Work?</h2>
        <p>Participating in our auction is easy! Just follow these simple steps:</p>
        <ul>
          <li><strong>Step 1:</strong> Sign up and create an account.</li>
          <li><strong>Step 2:</strong> Browse through a variety of auctions.</li>
          <li><strong>Step 3:</strong> Place your bid on items you like.</li>
          <li><strong>Step 4:</strong> Win the bid and complete the payment.</li>
          <li><strong>Step 5:</strong> Receive your item at your doorstep!</li>
        </ul>
      </section>

      <section className="benefits">
        <h2>Why Participate in Online Auctions?</h2>
        <p>Online auctions offer unique opportunities for buyers and sellers:</p>
        <ul>
          <li>Access to rare and unique items.</li>
          <li>Competitive prices through bidding.</li>
          <li>Excitement and engagement in a real-time auction environment.</li>
          <li>Secure payments and trusted transactions.</li>
        </ul>
      </section>

      <section className="popular-categories">
        <h2>Popular Auction Categories</h2>
        <p>Explore a variety of categories to find items that interest you:</p>
        <ul>
          <li>Electronics</li>
          <li>Fashion and Accessories</li>
          <li>Home and Kitchen</li>
          <li>Collectibles and Antiques</li>
          <li>Art and Crafts</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
