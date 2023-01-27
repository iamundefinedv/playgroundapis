// Import 3rd party packages
import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

// Setup dotenv and .env files
dotenv.config();
const PORT = process.env.PORT || 19876;
const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL || 'something went wrong bud';

// Configure MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_CONNECTION_URL);
mongoose.connection.once('open', () => console.log('MongoDB Successfully Connected'));

// Import Routes
import coffeeRouter from './routes/coffee.js';
import teaRouter from './routes/tea.js';

// Initialize app
const app = express();

// Middleware
app.use(express.json());

// General Routes
app.get('/', (req, res) => res.send('home page, head to /api for more information'));

// API Routes
app.use('/api/coffee', coffeeRouter);
app.use('/api/tea', teaRouter);

// Start the server
app.listen(PORT, () => console.log(`Server has started on Port:${PORT}`));