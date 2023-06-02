import config from '../../../config';
import { IUser } from './user.interface';
import User from './user.model';
import { generateUserId } from './user.utils';

// create user
async function createUserToDb(payload: IUser): Promise<IUser | null> {
  // AUTO generated increamental id
  const id = await generateUserId();
  payload.id = id;
  // default password
  if (!payload.password) {
    payload.password = config.default_student_pass as string;
  }

  const user = await User.create(payload);
  if (!user) {
    throw new Error('Failed to create user!');
  }

  return user;
}

export default {
  createUserToDb,
};
