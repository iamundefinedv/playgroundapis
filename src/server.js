import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

// Setup dotenv for .env files
dotenv.config();

const PORT = process.env.PORT || 19876;
const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL || 'something went wrong bud';

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_CONNECTION_URL);

mongoose.connection.once('open', () => console.log('MongoDB Successfully Connected'));

// Import Routes
import coffeeRouter from './api/coffee.js';

const app = express();

app.use(express.json());

// General Routes
app.get('/', (req, res) => res.send('home page, head to /api for more information'));
app.get('/api', (req, res) => res.send('api page, available apis - coffee, tea. available at playgroundapis.net/api/'));

// API Routes
app.use('/api/coffee', coffeeRouter);


app.listen(PORT, () => console.log(`Server has started on Port:${PORT}`));