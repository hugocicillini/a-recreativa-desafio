import { Router } from 'express';
import {
  createTask,
  deleteTaskById,
  EditTaskById,
  getTasks,
} from '../controllers/taskController';

const route = Router();

route.post('/create', createTask);

route.get('/', getTasks);

route.put('/:id', EditTaskById);

route.delete('/:id', deleteTaskById);

export default route;
