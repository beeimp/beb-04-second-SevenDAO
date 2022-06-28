export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const verifyJwt = (iat: number) => {
  const authIat = iat < 10 ** 10 ? iat * 10 ** 3 : iat;
  return Date.now() <= authIat;
};
