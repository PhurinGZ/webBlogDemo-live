// routes/user.js

import express from 'express';
import { userProfile, editUserProfile } from '../controller/user.js';

const router = express.Router();

router.get('/profile/', userProfile);
router.put('/:id/editProfile', editUserProfile);

export default router;


