import { Router } from "express";
import Coffee from "../models/Coffee.js";
import jwt from 'jsonwebtoken';
import isAuthenticated from "./authenticated.js";


// Create a express router
const router = Router();

// GET - Return a list of all coffee's 
router.get('/', async (req, res) => {
    isAuthenticated(req, res);
    try {
        // Find all coffee's in the database
        const allCoffee = await Coffee.find();
        res.json(allCoffee);
    } catch (err) {
        // Return an error if finding all the coffee failed
        console.log(err);
        res.status(500).end();
    }
});

// POST - Create a Coffee
router.post('/', async (req, res) => {

    isAuthenticated(req, res);
    // Get the content from the request body
    const content = req.body;

    // Return a bad request status if there is no content
    if (!content) return res.status(400).end();

    // Create the new coffee
    const coffee = new Coffee(content);

    try {
        // Save the coffee to the database
        await coffee.save();
        res.status(201).end();
    } catch (err) {
        // Return an error if saving the new coffee failed
        console.log(err.message);
        res.status(500).send(err.message);
    }

});

// PUT - Update a Coffee - must be authenticated, keep unaccessable for now.
router.put('/:id', async (req, res) => {
    // Get the content from the request body
    const content = req.body;
    // Get the Coffee Id from the Url Paramaters
    const id = req.params.id;

    try {
        // Update the coffee with the new content
        await Coffee.findByIdAndUpdate(id, content);
        res.status(200).end();
    }
    catch (err) {
        // Return an error if updating the coffee failed
        console.log(err);
        res.status(500).send(err.message);
    }
});

// DELETE - Delete a Coffee - must be authenticated or keep unaccessable
router.delete('/:id', async (req, res) => {
    // return res.status(418).send('☕️');
    const id = req.params.id;

    // If theres no id in the url params, return an error
    if (!id) return res.status(500).send('No ID');

    try {
        // Delete the coffee
        await Coffee.deleteOne({ _id: id });
        res.status(204).end();
    } catch (err) {
        // Return an error if deleting the coffee failed
        console.log(err);
        res.status(500).send(err.message);
    }
});

// Export the router
export default router;