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

export default router;