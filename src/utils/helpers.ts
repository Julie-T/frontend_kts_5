export const getMoreFetch = (length: number, count: number) => {
  if (length === count || length === 0) {
    return false;
  }
  return true;
};
