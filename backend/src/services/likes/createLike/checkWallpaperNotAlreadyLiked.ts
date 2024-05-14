import findSaveByWallpaperAndUserIds from '@src/repositories/saves/findSaveByWallpaperAndUserIds';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const checkWallpaperNotAlreadyLiked = async (wallpaperId: string, userId: string) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);
  const userObjectId = new ObjectId(userId);

  const like = await findSaveByWallpaperAndUserIds(wallpaperObjectId, userObjectId);

  if (like) {
    const errorStatus = 400;
    const errorMessage = 'This wallpaper has already been liked by this user!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkWallpaperNotAlreadyLiked;