import { Router } from "express";
import Tea from "../models/Tea.js";
import isAuthenticated from "../middleware/authenticated.js";


// Create a express router
const router = Router();

// GET - Return a list of all tea's 
router.get('/', async (req, res) => {
    try {
        // Find all Tea's in the database
        const alltea = await Tea.find();
        res.json(alltea);
    } catch (err) {
        // Return an error if finding all the tea failed
        console.log(err);
        res.status(500).end();
    }
});

// POST - Create a tea
router.post('/', isAuthenticated, async (req, res) => {

    // Get the content from the request body
    const content = req.body;

    // Return a bad request status if there is no content
    if (!content) return res.status(400).end();

    // Create the new tea
    const tea = new Tea(content);

    try {
        // Save the tea to the database
        await tea.save();
        res.status(201).end();
    } catch (err) {
        // Return an error if saving the new tea failed
        console.log(err.message);
        res.status(500).send(err.message);
    }

});

// PUT - Update a tea - must be authenticated, keep unaccessable for now.
router.put('/:id', isAuthenticated, async (req, res) => {
    // Get the content from the request body
    const content = req.body;
    // Get the tea Id from the Url Paramaters
    const id = req.params.id;

    try {
        // Update the tea with the new content
        await Tea.findByIdAndUpdate(id, content);
        res.status(200).end();
    }
    catch (err) {
        // Return an error if updating the tea failed
        console.log(err);
        res.status(500).send(err.message);
    }
});

// DELETE - Delete a tea - must be authenticated or keep unaccessable
router.delete('/:id', isAuthenticated, async (req, res) => {
    // return res.status(418).send('☕️');
    const id = req.params.id;

    // If theres no id in the url params, return an error
    if (!id) return res.status(500).send('No ID');

    try {
        // Delete the tea
        await Tea.deleteOne({ _id: id });
        res.status(204).end();
    } catch (err) {
        // Return an error if deleting the tea failed
        console.log(err);
        res.status(500).send(err.message);
    }
});

// Export the router
export default router;