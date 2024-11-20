import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuctionItem from './components/AuctionItem';
import './Auctions.css';

function Auctions() {
  const [auctionItems, setAuctionItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    axios.get('http://localhost:5000/api/auctions')
      .then((response) => {
        setAuctionItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching auction items:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading auctions...</p>;
  }

  if (auctionItems.length === 0) {
    return <p>No auction items found.</p>;
  }

  return (
    <div className="auction-page">
      <h1>Auctions</h1>
      <div className="auction-grid">
        {auctionItems.map((item) => (
          <AuctionItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Auctions;