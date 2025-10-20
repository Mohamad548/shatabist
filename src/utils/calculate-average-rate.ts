export const calculateAverageRate = (comments: unknown[] = []) => {
  const validRates = comments
    .map((comment) => {
      if (
        typeof comment === 'object' &&
        comment !== null &&
        'rate' in comment &&
        typeof (comment as any).rate === 'number'
      ) {
        return (comment as any).rate;
      }
      return null;
    })
    .filter((rate): rate is number => rate !== null);

  if (!validRates.length) return undefined;

  const total = validRates.reduce((sum, r) => sum + r, 0);
  return Math.round((total / validRates.length) * 10) / 10;
};
