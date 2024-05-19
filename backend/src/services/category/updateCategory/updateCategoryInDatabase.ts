import { ObjectId } from 'mongodb';
import { CategoryUpdate } from '.';
import updateCategoryById from '@src/repositories/category/updateCategoryById';

const updateCategoryInDatabase = async (categoryId: string, udpate: CategoryUpdate) => {
  const categoryObjectId = new ObjectId(categoryId);
  const updatedCategory = await updateCategoryById(categoryObjectId, udpate);
  return updatedCategory;
};

export default updateCategoryInDatabase;
