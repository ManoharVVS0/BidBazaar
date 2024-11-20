import React, { useState } from 'react';
import axios from 'axios';

const AddAuctionItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [endTime, setEndTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      startingPrice,
      endTime,
      imageUrl
    };

    axios.post('http://localhost:5000/api/auction-items', formData)
      .then((response) => {
        setMessage('Auction item successfully created');
        console.log('Item added:', response.data);
      })
      .catch((error) => {
        setMessage('Error creating auction item');
        console.error('Error adding item:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Starting Price"
        value={startingPrice}
        onChange={(e) => setStartingPrice(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <button type="submit">Add Auction Item</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddAuctionItem;//addauctionitem.js