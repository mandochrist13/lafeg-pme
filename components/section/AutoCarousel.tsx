import { useEffect, useRef, useState, ReactNode } from "react";

interface AutoCarouselProps {
  children: ReactNode | ReactNode[];
  interval?: number;
}

export default function AutoCarousel({ children, interval = 3000 }: AutoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const childrenArray = Array.isArray(children) ? children : [children];

  useEffect(() => {
    const totalChildren = childrenArray.length;

    const autoScroll = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % totalChildren;

        const container = containerRef.current;
        const child = container?.children[nextIndex] as HTMLElement;

        if (container && child) {
          container.scrollTo({
            left: child.offsetLeft,
            behavior: "smooth",
          });
        }

        return nextIndex;
      });
    }, interval);

    return () => clearInterval(autoScroll);
  }, [interval, childrenArray.length]);

  return (
    <div className="overflow-x-hidden w-full">
      <div className="flex w-max space-x-4" ref={containerRef}>
        {childrenArray.map((child, i) => (
          <div key={i} className="flex-shrink-0 w-80">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}