import "dotenv/config";
import bcrypt from "bcrypt";

const saltRounds: number = parseInt(process.env.HASH_SALT_ROUNDS as string);

export const hashPassword = async (password: string) => {
  const salt: string = await bcrypt.genSalt(saltRounds);
  const hashedPass: string = await bcrypt.hash(password, salt);
  return hashedPass;
};

export const comparePassword = async (pass: string, hashedPass: string) => {
  const result: boolean = await bcrypt.compare(pass, hashedPass);
  return result;
};
