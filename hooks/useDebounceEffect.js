import { useEffect } from 'react';

export const useDebounceEffect = (timeout, fn, deps) => {
  useEffect(() => {
    let cleanUpFn;
    const timeoutId = setTimeout(() => {
      cleanUpFn = fn();
    }, timeout);
    return () => {
      cleanUpFn && cleanUpFn();
      clearTimeout(timeoutId);
    };
  }, deps);
};
