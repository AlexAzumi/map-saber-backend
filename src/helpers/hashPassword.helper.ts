import * as bcrypt from 'bcrypt';

/**
 * Hashes the password using bcrypt
 */
export const hashPassword = async (passwordToHash: string): Promise<string> => {
  return await bcrypt.hash(passwordToHash, 10);
};

/**
 * Compares the hashed password to a password in plan text
 * @returns `true` if the password is the same
 */
export const isSamePassword = async (
  passwordToCompare: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(passwordToCompare, hashedPassword);
};
