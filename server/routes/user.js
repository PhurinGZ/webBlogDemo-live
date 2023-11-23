// routes/user.js

import express from 'express';
import { userProfile } from '../controller/user';

const router = express.Router();

router.get('/profile/:email', userProfile);

export default router;

