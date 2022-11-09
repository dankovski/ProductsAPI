import { Router, Request, Response } from 'express';
import Product from '../models/product.js'

const router = Router();

router.put('/', async (req: Request, res: Response) => {
    if (!req.body || !req.body.Price || !req.body.Name) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    else{
        const product = new Product({
            Name: req.body.Name,
            Price: req.body.Price
        });
    
        try {
            await product.save();
            res.status(200).json(product);
        } catch (err: any) {
            res.status(400).json({ message: (err as Error).message });
        }
    }
});

export default router;