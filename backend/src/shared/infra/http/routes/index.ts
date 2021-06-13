import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import animalsRouter from '@modules/animal/infra/http/routes/animal.routes';
import apparitionsRouter from '@modules/apparition/infra/http/routes/apparition.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/animals', animalsRouter);
routes.use('/apparitions', apparitionsRouter);

export default routes;
