import updateUserById from '@src/repositories/user/updateUserById';

const updateUserInDatabase = async (update: any) => {
  const updatedUser = await updateUserById(update);
  if (updatedUser.provider === 'local') delete updatedUser.password;

  return updatedUser;
};

export default updateUserInDatabase;