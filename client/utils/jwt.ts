export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const verifyJwt = (exp: number) => {
  const authExp = exp < 10 ** 10 ? exp * 10 ** 3 : exp;
  return Date.now() <= authExp;
};
