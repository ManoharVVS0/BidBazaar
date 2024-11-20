const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  auctionItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuctionItem', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bidAmount: { type: Number, required: true },
});

module.exports = mongoose.model('Bid', bidSchema);