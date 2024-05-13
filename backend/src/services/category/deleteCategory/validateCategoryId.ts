import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const validateCategoryId = (id: string) => {
  const isValidId = ObjectId.isValid(id);

  if (!isValidId) {
    const errorStatus = 400;
    const errorMessage = 'Invalid category id!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default validateCategoryId;