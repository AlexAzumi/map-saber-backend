import * as bcrypt from 'bcrypt';

/**
 * Hashes the password using bcrypt
 */
export const hashPassword = async (passwordToHash: string): Promise<string> => {
  return await bcrypt.hash(passwordToHash, 10);
};
