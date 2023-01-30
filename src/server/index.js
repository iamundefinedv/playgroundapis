// Import 3rd party packages
import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
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
import authRouter from './routes/auth.js';
import pagesRouter from './routes/pages.js';

// Initialize app
const app = express();

// EJS View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(__dirname + '/public'));

// Middleware
app.use(express.json());
app.use(cors());

const apiRoutes = ['coffee', 'tea', 'dogs'];

// General Routes
app.get('/', (req, res) => {
    const random = Math.floor(Math.random() * apiRoutes.length);
    const randomRoute = apiRoutes[random];
    res.render('pages/index', { randomRoute });
});
app.use('/pages', pagesRouter);


// Auth Routes
app.use('/auth', authRouter);
// API Routes
app.use('/api/coffee', coffeeRouter);
app.use('/api/tea', teaRouter);

// Start the server
app.listen(PORT, () => console.log(`Server has started on Port:${PORT}`));