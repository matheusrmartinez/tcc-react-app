import uploadConfig from '@config/upload';
import { Router } from 'express';
import multer from 'multer';

import CreateApparitionService from '../../../services/CreateApparitionService';
import UpdateApparitionService from '../../../services/UpdateApparitionService';
import ApparitionRepository from '../../typeorm/repositories/ApparitionRepository';

const upload = multer(uploadConfig);

const ApparitionRouter = Router();

ApparitionRouter.post(
  '/',
  upload.single('image'),
  async (request, response) => {
    const {
      latitude,
      longitude,
      user,
      specie_id,
      apparition_name,
      address,
    } = request.body;

    const image = request.file.filename;

    const apparitionRepository = new ApparitionRepository();
    const createApparition = new CreateApparitionService(apparitionRepository);

    const apparition = await createApparition.execute({
      latitude,
      longitude,
      image,
      user,
      animal_id: null,
      specie_id,
      name: apparition_name,
      address,
    });

    return response.json(apparition);
  },
);

ApparitionRouter.get('/', async (request, response) => {
  const apparitionRepository = new ApparitionRepository();
  const apparationsNotApproved = await apparitionRepository.findAllNotApproved();

  return response.json(apparationsNotApproved);
});

ApparitionRouter.get('/approved', async (request, response) => {
  const apparitionRepository = new ApparitionRepository();
  const apparitionsApproved = await apparitionRepository.findAllApproved();

  return response.json(apparitionsApproved);
});

ApparitionRouter.get('/approved/:specie_id', async (request, response) => {
  const apparitionRepository = new ApparitionRepository();
  const { specie_id } = request.params;
  const apparitionsApproved = await apparitionRepository.findBySpecieId(
    specie_id,
  );

  return response.json(apparitionsApproved);
});

ApparitionRouter.get('/:id', async (request, response) => {
  const apparitionRepository = new ApparitionRepository();
  const { id } = request.params;
  const apparitionById = await apparitionRepository.findById(id);

  Object.assign(apparitionById, {
    image_url: `files/${apparitionById?.image}`,
  });

  return response.json(apparitionById);
});

ApparitionRouter.patch(
  '/approvation/:approvation',
  async (request, response) => {
    const apparitionRepository = new ApparitionRepository();
    const updateApparition = new UpdateApparitionService(apparitionRepository);
    const { approvation } = request.params;

    const approved = approvation === 'true';

    const apparition = await updateApparition.execute({
      id: request.body.id,
      specie_id: request.body.specie_id,
      animal_id: request.body.animal_id,
      popular_name: request.body.popular_name,
      scientific_name: request.body.scientific_name,
      approved,
      pending_analysis: false,
    });

    return response.json(apparition);
  },
);

export default ApparitionRouter;
