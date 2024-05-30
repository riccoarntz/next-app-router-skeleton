export const getMinimumStaggerDuration = (
  total: number,
  maxDuration = 0.5,
  minStagger = 0.1,
): number => Math.min(minStagger, maxDuration / total);
