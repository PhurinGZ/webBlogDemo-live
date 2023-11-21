// routes/post.js

import express from 'express';
import { commentPost } from '../controller/post.js';

const router = express.Router();

router.patch('/:id/commentPost', commentPost);

export default router;
