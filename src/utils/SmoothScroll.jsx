import React, { useState, useEffect, useRef } from "react";
import { TweenLite, Power4 } from "gsap";

const SmoothScroll = ({ children }) => {
  const [height, setHeight] = useState(window.innerHeight);
  const viewportRef = useRef(null);
  const fakeRef = useRef(null);

  useEffect(() => {
    const ro = new ResizeObserver(elements => {
      for (let elem of elements) {
        const crx = elem.contentRect;
        setHeight(crx.height);
      }
    });
    ro.observe(viewportRef.current);
    window.addEventListener("scroll", handleScroll);
    return () => {
      ro.unobserve(viewportRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    TweenLite.to(viewportRef.current, 1, {
      y: -window.pageYOffset,
      ease: Power4.easeOut,
    });
  };

  return (
    <>
      <div className="viewport" ref={viewportRef}>
        {children}
      </div>
      <div ref={fakeRef} style={{ height }} />
    </>
  );
};

export default SmoothScroll;