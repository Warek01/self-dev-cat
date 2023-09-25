import { useEffect, useRef } from "react";

export const useOnWindowClick = (func: (event: MouseEvent) => void): void => {
  const ref = useRef(func)

  useEffect(() => {
    window.addEventListener('click', ref.current)

    return () => {
      window.removeEventListener('click', ref.current)
    }
  }, []);
}