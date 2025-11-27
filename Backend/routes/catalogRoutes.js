import { Router } from 'express';
import * as controller from '../controllers/catalogController.js';
const router = Router();
router.post('/search', controller.searchCatalog);
router.get('/getProductDetails', controller.getProductDetails);
export default router;