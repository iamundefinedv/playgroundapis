import { Router } from "express";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

const router = Router();
// POST - login a user and get a JWT
router.post('/signin', async (req, res, next) => {
    // Get the username from the request body
    let { username, password } = req.body;

    // Check if the fields the user provides are valid
    if (!username || !password) return res.status(400).send("missing fields");

    let existingUser;

    // Look for a user in the database
    try {
        existingUser = await User.findOne({ username });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }

    // Return an error if theres no user or the passwords dont match
    if (!existingUser || existingUser.password !== password) return res.status(400).send('Wrong Details');

    // Get the JWT secret from the .env 
    const jwtSecret = process.env.JWT_SECRET || 'suupperrrsecrettkeeyyy';

    // Create and sign a token for the user
    let token;
    try {
        token = jwt.sign({
            userId: existingUser.id,
            username: existingUser.username,
        }, jwtSecret, { expiresIn: '1h' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }

    // Return the token and username
    return res.status(200).json({
        data: {
            userId: existingUser.id,
            username: existingUser.username,
            token
        }
    });

});

router.post('/signup', async (req, res) => {
    // Get the content from the body
    const { username, password } = req.body;

    // Look for a user in the database
    let existingUser;
    try {
        existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).send('user found, sign in');
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }

    // Create a new user
    const user = new User({ username, password });

    // Save the new user
    try {
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }

    // Get the JWT secret from the .env 
    const jwtSecret = process.env.JWT_SECRET || 'suupperrrsecrettkeeyyy';

    // Create and sign a token for the user
    let token;
    try {
        token = jwt.sign({
            userId: user.id,
            username: user.username,
        }, jwtSecret, { expiresIn: '1h' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }

    // Return the token and username
    return res.status(200).json({
        data: {
            userId: user.id,
            username: user.username,
            token
        }
    });
});

export default router;