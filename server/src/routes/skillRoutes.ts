import { Router } from 'express';
import { createSkill, getSkills } from '../controllers/skillController';

const route = Router();

route.post('/create', createSkill);

route.get('/', getSkills);

export default route;
