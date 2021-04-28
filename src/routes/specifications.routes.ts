import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/createSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController';
import { Router } from 'express';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post('/', createSpecificationController.handle);

specificationsRoutes.get('/', listSpecificationsController.handle);

export { specificationsRoutes };
