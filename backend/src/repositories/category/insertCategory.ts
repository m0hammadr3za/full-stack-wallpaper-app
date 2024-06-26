import { Category } from '@src/models/categoryModel';
import getCategoriesCollection from './getCategoriesCollection';

const insertCategory = async (category: Category): Promise<Category> => {
  const categoriesCollection = await getCategoriesCollection();
  const result = await categoriesCollection.insertOne(category);

  const savedCategory = { _id: result.insertedId, ...category };
  return savedCategory;
};

export default insertCategory;
