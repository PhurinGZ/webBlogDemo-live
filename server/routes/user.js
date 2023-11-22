// routes/user,js
import express from 'express';
import {userProfile} from '../controller/user';

const router = express.Router();

router.get('/profile', userProfile);

export default router;
