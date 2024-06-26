import { Like } from '@src/models/likeModel';
import getLikesCollection from './getLikesCollection';

const insertLike = async (like: Like): Promise<Like> => {
  const likesCollection = await getLikesCollection();
  const result = await likesCollection.insertOne(like);

  const savedLike = { _id: result.insertedId, ...like };
  return savedLike;
};

export default insertLike;
