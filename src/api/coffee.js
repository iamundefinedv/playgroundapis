import { Router } from "express";
import Coffee from "../models/Coffee.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const allCoffee = await Coffee.find();
        res.json(allCoffee);
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

// Create a Coffee
router.post('/', async (req, res) => {

    const content = req.body;

    if (!content) return res.status(400).end();

    const coffee = new Coffee(content);

    try {
        await coffee.save();
        res.status(201).end();
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }

});

// Update a Coffee - must be authenticated, keep unaccessable for now.
router.put('/:id', async (req, res) => {
    const content = req.body;
    const id = req.params.id;

    try {
        await Coffee.findByIdAndUpdate(id, content);
        res.status(200).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

// Delete a Coffee - must be authenticated or keep unaccessable
router.delete('/:id', async (req, res) => {
    // return res.status(418).send('☕️');
    const id = req.params.id;

    if (!id) return res.status(500).send('No ID');

    try {
        await Coffee.deleteOne({ _id: id });
        res.status(204).end();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});


export default router;