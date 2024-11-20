const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auctionDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Import Models
const User = require('./models/User');
const AuctionItem = require('./models/AuctionItem');
const Bid = require('./models/Bid'); // Import the new Bid model

// Sign-up route
app.post('/api/signup', async (req, res) => {
  const { username, email, password, mobile } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    const newUser = new User({ username, email, password, mobile });
    await newUser.save();
    res.status(200).json({ message: 'Sign up successful!' });
  } catch (error) {
    console.error('Error during sign up:', error);
    res.status(500).json({ message: 'Error saving user data.' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: 'Login successful!', username: user.username, userId: user._id });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login.' });
  }
});

// Route to get all auction items
app.get('/api/auctions', async (req, res) => {
  try {
    const items = await AuctionItem.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching auction items:', error);
    res.status(500).json({ message: 'Error fetching auction items.' });
  }
});

// Route to add a new auction item
app.post('/api/auction-items', async (req, res) => {
  const { title, description, startingPrice, endTime, imageUrl } = req.body;

  try {
    const newAuctionItem = new AuctionItem({
      title,
      description,
      startingPrice,
      endTime,
      imageUrl
    });
    await newAuctionItem.save();
    res.status(201).json({ message: 'Auction item successfully created', item: newAuctionItem });
  } catch (error) {
    console.error('Error creating auction item:', error);
    res.status(500).json({ message: 'Error creating auction item.' });
  }
});

// Bidding System
app.post('/api/bids/place', async (req, res) => {
  const { auctionItemId, userId, bidAmount } = req.body;

  console.log('Bid request:', req.body);

  try {
    const auctionItem = await AuctionItem.findById(auctionItemId);
    if (!auctionItem) {
      return res.status(404).json({ message: 'Auction item not found' });
    }

    const highestBid = await Bid.findOne({ auctionItemId }).sort({ bidAmount: -1 });

    if (highestBid && bidAmount <= highestBid.bidAmount) {
      return res.status(400).json({ message: 'Your bid must be higher than the current highest bid.' });
    }

    if (!highestBid && bidAmount <= auctionItem.startingPrice) {
      return res.status(400).json({ message: 'Your bid must be higher than the starting price.' });
    }

    const newBid = new Bid({ auctionItemId, userId, bidAmount });
    await newBid.save();

    res.status(201).json({ message: 'Bid placed successfully', bid: newBid });
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(500).json({ message: 'Error placing bid.' });
  }
});

app.get('/api/bids/:auctionItemId', async (req, res) => {
  const { auctionItemId } = req.params;

  try {
    const bids = await Bid.find({ auctionItemId }).populate('userId', 'username').sort({ bidAmount: -1 });
    res.status(200).json(bids);
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).json({ message: 'Error fetching bids.' });
  }
});

// Route to get user information
app.get('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ message: 'Error fetching user information.' });
  }
});

// Route to get user's bids
app.get('/api/users/:userId/bids', async (req, res) => {
  const { userId } = req.params;

  try {
    const bids = await Bid.find({ userId }).populate('auctionItemId', 'title');
    res.status(200).json(bids);
  } catch (error) {
    console.error('Error fetching user bids:', error);
    res.status(500).json({ message: 'Error fetching user bids.' });
  }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});