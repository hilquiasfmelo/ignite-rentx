import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin';

const carsRoutes = Router();

const uploadCarImages = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureIsAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/specifications/:car_id',
  ensureAuthenticated,
  ensureIsAdmin,
  createCarSpecificationController.handle,
);

carsRoutes.post(
  '/images/:car_id',
  ensureAuthenticated,
  ensureIsAdmin,
  uploadCarImages.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
