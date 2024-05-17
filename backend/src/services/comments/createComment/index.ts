import { CommentPayload } from '@src/models/commentModel';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import validateComment from './validateComment';
import checkWallpaperExists from './checkWallpaperExists';
import addNewFields from './addNewFields';
import saveComment from '@src/repositories/comments/saveComment';

const createComments = async (comment: CommentPayload, user: User) => {
  comment = validateComment(comment);

  await checkWallpaperExists(comment.wallpaperId);

  const userId = user._id as ObjectId;
  const newComment = addNewFields(comment, userId);

  const savedComment = await saveComment(newComment);
  return savedComment;
};

export default createComments;
