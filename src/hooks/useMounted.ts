import { RefObject, useEffect, useRef } from "react";

export default function useMounted(): RefObject<boolean> {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return isMounted;
}
