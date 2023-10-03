export const debounce = (callbackFn: (args: string[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return function (...args: string[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callbackFn(args);
    }, delay);
  };
}