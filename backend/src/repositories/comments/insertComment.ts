import { Comment } from '@src/models/commentModel';
import getCommentsCollection from './getCommentsCollection';

const insertComment = async (comment: Comment): Promise<Comment> => {
  const commentsCollection = await getCommentsCollection();
  const result = await commentsCollection.insertOne(comment);

  const savedComment = { _id: result.insertedId, ...comment };
  return savedComment;
};

export default insertComment;
