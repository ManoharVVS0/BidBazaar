import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuctionItem = ({ item }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [highestBid, setHighestBid] = useState(null);
  const [highestBidder, setHighestBidder] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [auctionEnded, setAuctionEnded] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    const endTime = new Date(item.endTime);
    const now = new Date();
    const timeLeft = endTime - now;
    if (timeLeft <= 0) {
      setAuctionEnded(true);
      return 'Auction ended';
    }
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }, [item.endTime]);

  useEffect(() => {
    // Fetch the highest bid for the auction item
    axios.get(`http://localhost:5000/api/bids/${item._id}`)
      .then((response) => {
        if (response.data.length > 0) {
          setHighestBid(response.data[0].bidAmount);
          setHighestBidder(response.data[0].userId.username);
        }
      })
      .catch((error) => {
        console.error('Error fetching highest bid:', error);
      });

    // Set the initial time left
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [item._id, calculateTimeLeft]);

  const handleBid = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('You must be logged in to place a bid.');
      return;
    }

    const bidValue = parseFloat(bidAmount);
    if (isNaN(bidValue) || bidValue <= 0) {
      alert('Please enter a valid bid amount.');
      return;
    }

    if (highestBid !== null && bidValue <= highestBid) {
      alert('Your bid must be higher than the current highest bid.');
      return;
    }

    if (highestBid === null && bidValue <= item.startingPrice) {
      alert('Your bid must be higher than the starting price.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/bids/place', {
        auctionItemId: item._id,
        userId: userId,
        bidAmount: bidValue,
      });

      console.log('Response:', response.data);

      if (response.data.message === 'Bid placed successfully') {
        alert('Bid placed successfully!');
        setHighestBid(bidValue); // Update the highest bid
        setHighestBidder(response.data.bid.userId.username); // Update the highest bidder
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Error placing bid.');
    }
  };

  useEffect(() => {
    if (auctionEnded && highestBid) {
      axios.post(`http://localhost:5000/api/auctions/${item._id}/end`)
        .then((response) => {
          console.log('Auction ended:', response.data);
        })
        .catch((error) => {
          console.error('Error ending auction:', error);
        });
    }
  }, [auctionEnded, highestBid, item._id]);

  return (
    <div className="auction-item">
      <h2>{item.title}</h2> {/* Display the title */}
      <p>{item.description}</p>
      <p>Starting Price: ${item.startingPrice}</p>
      <p>Highest Bid: ${highestBid} {highestBidder && `by ${highestBidder}`}</p>
      <p>Time Left: {timeLeft}</p>
      <img src={item.imageUrl} alt={item.title} style={{ width: '150px', height: '150px' }} />
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter your bid"
        disabled={auctionEnded}
      />
      <button onClick={handleBid} disabled={auctionEnded} style={auctionEnded ? { textDecoration: 'line-through', backgroundColor: 'grey' } : {}}>
        Place Bid
      </button>
    </div>
  );
};

export default AuctionItem;  //auctionitem.js
