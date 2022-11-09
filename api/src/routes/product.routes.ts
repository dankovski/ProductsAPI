import { Router, Request, Response } from 'express';
import Product from '../models/product.js'

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
});

router.get('/:id', async (req: Request, res: Response) => {
    try{
        const product = await Product.findOne({'Id' : req.params.id});
        if(product){
            res.status(200).json(product);
        }
        else{
            res.status(400).json({error: `product with id ${req.params.id} does not exists`});
        }
    }
    catch(error: any){
        res.status(400).json({error: error.message});
    }
});

router.put('/', async (req: Request, res: Response) => {
    if (!req.body || !req.body.hasOwnProperty("Price") || !req.body.hasOwnProperty("Name")) {
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
            res.status(400).json({ message: err.message });
        }
    }
});

router.post('/:id', async (req: Request, res: Response) => {
    try{
        const product = await Product.findOne({'Id' : req.params.id});
        if(product){
            if (!req.body || (!req.body.hasOwnProperty("Price") && !req.body.hasOwnProperty("Name"))) {
                return res.status(400).json({ message: 'Missing fields' });
            }
            else{
                if(req.body.hasOwnProperty("Price")){
                    product.Price = req.body.Price
                }
                if(req.body.hasOwnProperty("Name")){
                    product.Name = req.body.Name
                }
                await product.save();
                return res.status(200).json(product);
            }
        }
        else{
            res.status(400).json({error: `product with id ${req.params.id} does not exists`});
        }
    }
    catch(error: any){
        res.status(400).json({error: error.message});
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try{
        const product = await Product.findOne({'Id' : req.params.id});
        if(product){
            await product.delete();
            res.status(400).json({'message': 'product successfully deleted'});
        }
        else{
            res.status(400).json({error: `product with id ${req.params.id} does not exists`});
        }
    }
    catch(error: any){
        res.status(400).json({error: error.message});
    }
});

export default router;