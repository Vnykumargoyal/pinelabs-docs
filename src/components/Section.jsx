import { useEffect, useRef } from "react";
import { useDocStore } from "../app/store";

export default function Section({ id, children }) {
  const ref = useRef();
  const setSection = useDocStore((s) => s.setSection);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSection(id);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} id={id}>
      {children}
    </div>
  );
}
