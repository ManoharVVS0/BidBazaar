const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');
const AuctionItem = require('../models/AuctionItem');

// Place a new bid
router.post('/place', async (req, res) => {
  const { auctionItemId, userId, bidAmount } = req.body;

  try {
    const auctionItem = await AuctionItem.findById(auctionItemId);
    if (!auctionItem) {
      return res.status(404).json({ message: 'Auction item not found' });
    }

    const newBid = new Bid({ auctionItemId, userId, bidAmount });
    await newBid.save();

    res.status(201).json({ message: 'Bid placed successfully', bid: newBid });
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(500).json({ message: 'Error placing bid' });
  }
});

// Get bids for an auction item
router.get('/:auctionItemId', async (req, res) => {
  const { auctionItemId } = req.params;

  try {
    const bids = await Bid.find({ auctionItemId }).populate('userId', 'username').sort({ bidAmount: -1 });
    res.status(200).json(bids);
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).json({ message: 'Error fetching bids' });
  }
});

module.exports = router;
