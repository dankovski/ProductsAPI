import express, { Express } from 'express';
import mongoose from 'mongoose';
import productRoute from './routes/product.routes.js';

const PORT = process.env.BACKEND_PORT;
const MONGO_DB_URL: string = `mongodb://${process.env.MONGODB_ADMIN_USERNAME}:${process.env.MONGODB_ADMIN_PASSWORD}@mongo:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE_NAME}?authSource=admin`;

await mongoose.connect(MONGO_DB_URL);

const app: Express = express();

app.use(express.json())
app.use('/products', productRoute);

app.listen(PORT, () => {
  console.log(` Server is running at https://localhost:${PORT}`);
});

export default app;