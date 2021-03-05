import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ProductsController from './app/controllers/ProductsController';

const routes = new Router();

routes.get('/products', ProductsController.index);
routes.get('/products/:id', ProductsController.show);
routes.post('/products', multer(multerConfig).single('photo'), ProductsController.store);
routes.put('/products/:id', ProductsController.update);
routes.delete('/products/:id', ProductsController.delete);

export default routes;