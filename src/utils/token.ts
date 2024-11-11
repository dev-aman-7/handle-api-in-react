export const generateToken = (): string => {
  const token = Math.random() * 200000000;
  return token.toString();
};
