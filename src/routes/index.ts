import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/sessions', authenticateRoutes);

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);

export { router };
