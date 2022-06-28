import crypto from 'crypto';

export const hashColor = (str: string) => {
  const color = crypto
    .createHash('sha256')
    .update(str ?? '')
    .digest('hex')
    .slice(0, 6);

  return `#${color}`;
};
