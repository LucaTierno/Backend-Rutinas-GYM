import { hash, compare } from "bcryptjs";

const encrypt = (password: string) => {
  const passwordHash = hash(password, 8);
  return passwordHash;
};

const verified = async (password: string, passhash: string) => {
  const isCorrect = await compare(password, passhash);
  return isCorrect;
};

export { encrypt, verified };
