import deleteUserWallpaper from '@src/repositories/wallpaper/deleteUserWallpaper';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const removeUserWallpaper = async (wallpaperId: string, publisherId: ObjectId) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);
  const sucess = await deleteUserWallpaper(wallpaperObjectId, publisherId);

  if (!sucess) {
    const errorStatus = 404;
    const errorMessage = `A wallpaper with this id, for this publisher, doesn't exist!`;
    throw new CustomError(errorStatus, errorMessage);
  }

  return { success: true };
};

export default removeUserWallpaper;
