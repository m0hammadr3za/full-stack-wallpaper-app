import { ObjectId } from 'mongodb';
import getWallpapersCollection from './getWallpapersCollection';

const findAndDeleteUserWallpaper = async (wallpaperId: string, publisherId: string) => {
  const usersCollection = await getWallpapersCollection();
  const result = await usersCollection.deleteOne({
    _id: new ObjectId(wallpaperId),
    publisherId: new ObjectId(publisherId),
  });

  const success = result.deletedCount === 1;
  if (success) return true;
  return false;
};

export default findAndDeleteUserWallpaper;