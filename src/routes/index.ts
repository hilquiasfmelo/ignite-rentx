import { authenticateRoutes } from '@routes/authenticate.routes';
import { categoriesRoutes } from '@routes/categories.routes';
import { specificationsRoutes } from '@routes/specifications.routes';
import { usersRoutes } from '@routes/users.routes';
import { Router } from 'express';

const router = Router();

router.use('/users', usersRoutes);
router.use('/sessions', authenticateRoutes);

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);

export { router };
