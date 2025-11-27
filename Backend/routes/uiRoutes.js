import { Router } from 'express';
import * as controller from '../controllers/uiController.js';
const router = Router();
router.get('/featured', controller.getFeaturedSection);
router.get('/categories', controller.getProductCategoryList);
export default router;