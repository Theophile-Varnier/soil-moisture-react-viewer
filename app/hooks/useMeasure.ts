import { useEffect, useRef, useState } from "react";

export function useMeasure<T extends HTMLElement>(
  dependencies: unknown[] = []
) {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<{
    width: number | null;
    height: number | null;
  }>({ width: null, height: null });
  const measure = () => {
    if (!ref.current) return;
    const { clientWidth: width, clientHeight: height } = ref.current;
    setSize({ width, height });
  };
  useEffect(() => {
    // measure();
    window?.addEventListener("resize", measure);
    return () => {
      window?.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const { width, height } = size;
  return { ref, width, height };
}
