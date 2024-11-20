const mongoose = require('mongoose');

const auctionItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  endTime: { type: Date, required: true }, // Add endTime field
});

module.exports = mongoose.model('AuctionItem', auctionItemSchema);