import { RefObject, useCallback, useEffect, useRef } from "react";

export default function useOutsideClick<T extends HTMLElement>(
  onClick: () => void
): RefObject<T> {
  const ref = useRef<T>(null);

  const handleClick = useCallback(
    (event: Event): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClick();
      }
    },
    [ref, onClick]
  );

  useEffect(() => {
    document.body.addEventListener("click", handleClick);
    return (): void => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return ref;
}
