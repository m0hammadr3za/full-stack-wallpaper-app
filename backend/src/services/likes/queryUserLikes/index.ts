import { LikesQuery } from '@src/models/likeModel';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import findUserLikes from '@src/repositories/likes/findUserLikes';
import validateQuery from './validateQuery';

const queryUserLikes = async (query: LikesQuery, user: User) => {
  query = validateQuery(query);

  const userId = user._id as ObjectId;
  const likedWallpapers = await findUserLikes(userId, query);

  return likedWallpapers;
};

export default queryUserLikes;
