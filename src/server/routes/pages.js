import { Router } from "express";

const router = Router();

router.get('/coffee', (req, res) => res.render('pages/coffee'));
router.get('/tea', (req, res) => res.render('pages/tea'));
router.get('/dogs', (req, res) => res.render('pages/dogs'));

export default router;