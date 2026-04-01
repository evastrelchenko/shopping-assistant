const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const recommendRoutes = require('./routes/recommend');
const wishlistRoutes = require('./routes/wishlist');

app.use('/api/recommend', recommendRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.get('/', (req, res) => {
    res.send('Shopping Assistant API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
