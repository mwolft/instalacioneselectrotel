import gsap from "gsap";

export const slideUpLeft = (element, options = {}) => {
  const defaults = {
    duration: 0.8,
    opacity: 0,
    y: 100,
    x: 100,
    ease: "power2.out",
  };

  const config = { ...defaults, ...options };

  if (element) {
    gsap.fromTo(
      element,
      {
        opacity: config.opacity,
        y: config.y,
        x: config.x,
      },
      {
        duration: config.duration,
        opacity: 1,
        y: 0,
        x: 0,
        ease: config.ease,
      },
    );
  }
};
