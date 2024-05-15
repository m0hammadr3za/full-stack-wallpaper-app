import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';
import { handleDeleteComment, handlePostComment } from '@src/api/controllers/commentsController';

const router: Router = express.Router();

router.post('/', authenticateUser, handlePostComment);
router.delete('/:id', authenticateUser, handleDeleteComment);

export default router;
