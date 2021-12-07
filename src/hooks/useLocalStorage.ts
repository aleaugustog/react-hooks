import { useCallback, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((value: T) => T)) => void, Error | null] {
  const [error, setError] = useState<Error | null>(null);
  const [storedValue, setStoredValue] = useState<T>((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((value: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue, error];
}
