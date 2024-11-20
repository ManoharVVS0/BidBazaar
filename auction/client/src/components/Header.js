import React from 'react';
import './Header.css';

const Header = () => (
    <header className="header">
        <nav>
            <img src='../logo(1).png' />
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">Auctions</a></li>
                <li><a href="/">Contact Us</a></li>
            </ul>
        </nav>
        <h1>Welcome to Online Auction</h1>
    </header>
);

export default Header;
