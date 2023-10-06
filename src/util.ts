export const debounce = (callbackFn: (args: string[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return function (...args: string[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callbackFn(args);
    }, delay);
  };
}

export const toastrConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
} as Record<string, string | number | boolean | undefined>;
