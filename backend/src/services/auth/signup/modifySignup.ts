import { hashPassword } from '@src/utils/hashPassword';
import { UserPayload } from '.';

const modifySignup = async (user: UserPayload) => {
  const userPassword = user.password;
  const hashedPassword = await hashPassword(userPassword);

  const finalUser = {
    ...user,
    password: hashedPassword,
    provider: 'local',
  };

  return finalUser;
};

export default modifySignup;
