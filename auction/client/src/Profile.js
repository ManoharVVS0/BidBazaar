import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Import the CSS file for styling

function Profile() {
  const [user, setUser] = useState(null);
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('You must be logged in to view your profile.');
      return;
    }

    // Fetch user information
    axios.get(`http://localhost:5000/api/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
      });

    // Fetch user's bids
    axios.get(`http://localhost:5000/api/users/${userId}/bids`)
      .then((response) => {
        setBids(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user bids:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div className="profile-page">
      <h1>{user.username}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Mobile: {user.mobile}</p>

      <h2>Your Bids</h2>
      {bids.length === 0 ? (
        <p>You have not placed any bids yet.</p>
      ) : (
        <ul>
          {bids.map((bid) => (
            <li key={bid._id}>
              <h3>Auction Item: {bid.auctionItemId.title}</h3>
              <p className="bid-amount">Bid Amount: ${bid.bidAmount}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Profile;