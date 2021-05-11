import { Router } from 'express';

import { authenticateRoutes } from '@shared/infra/http/routes/authenticate.routes';
import { carsRoutes } from '@shared/infra/http/routes/cars.routes';
import { categoriesRoutes } from '@shared/infra/http/routes/categories.routes';
import { rentalRoutes } from '@shared/infra/http/routes/rental.routes';
import { specificationsRoutes } from '@shared/infra/http/routes/specifications.routes';
import { usersRoutes } from '@shared/infra/http/routes/users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/sessions', authenticateRoutes);

router.use('/cars', carsRoutes);

router.use('/rentals', rentalRoutes);

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);

export { router };
