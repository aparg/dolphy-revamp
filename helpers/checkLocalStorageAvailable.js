export const isLocalStorageAvailable = () => {
  if (typeof window !== "undefined" && window.sessionStorage) {
    return true;
  }
  return false;
};
