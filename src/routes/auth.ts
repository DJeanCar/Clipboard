import { Router } from 'express';
import { login } from '../controllers';
import { authSchema } from '../schemas/auth';
import { validateRequestSchema } from '../middlewares/validateRequestSchema';

const router = Router();

router.post('/login', authSchema, validateRequestSchema, login);

export default router;
