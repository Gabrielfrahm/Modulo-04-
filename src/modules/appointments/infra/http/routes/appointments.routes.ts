import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   console.log(request.user);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  // usando injeção de dependências
  const createAppointmentService = container.resolve(CreateAppointmentService);

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;