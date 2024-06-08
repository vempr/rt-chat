import bcrypt from "bcryptjs";

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  const salt: string = await bcrypt.genSalt(saltRounds);
  const hashedPass: string = await bcrypt.hash(password, salt);
  return hashedPass;
};

export const comparePassword = async (pass: string, hashedPass: string) => {
  const result: boolean = await bcrypt.compare(pass, hashedPass);
  return result;
};
