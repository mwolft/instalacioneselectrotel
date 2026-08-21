import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
const waitForSingleImage = (img) => {
  if (img.complete) return Promise.resolve();

  return new Promise((resolve) => {
    img.addEventListener("load", resolve, { once: true });
    img.addEventListener("error", resolve, { once: true });
  });
};

export default function CasosExito(containerRef, imageRef, isMobile) {
  gsap.registerPlugin(ScrollTrigger);

  let ctx;
  let timers = [];

  try {
    ctx = gsap.context(() => {
      // Validar que el elemento a pinear exista
      if (!imageRef?.current) {
        console.warn("imageRef.current no está disponible para pinear");
        return;
      }

      // Create a timeline that is directly controlled by ScrollTrigger (scrub)
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "bottom bottom" : "bottom-=200 bottom",
          markers: false,
          pin: imageRef.current,
          invalidateOnRefresh: true,
        },
      });

      // inicializar textGroup: opacidad y textPaths con startOffset

      gsap.set("#text1", {
        attr: { startOffset: isMobile ? "75%" : "0%" },
        opacity: 0,
      });

      gsap.set("#text2", {
        attr: { startOffset: isMobile ? "75%" : "0%" },
        opacity: 0,
      });

      const tl2 = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: isMobile ? "top top" : "top center",
          end: "bottom-=200 bottom",
          markers: false,
          invalidateOnRefresh: true,
          scrub: 1,
        },
      });

      tl2.to(
        ".logoIzquierda",
        {
          duration: 0.2,
          x: isMobile ? 0 : 200,
          y: isMobile ? 150 : 0,
          opacity: 1,
          ease: "power3.out",
        },
        0,
      );
      tl2.to(
        "#text1",
        {
          attr: isMobile ? { startOffset: "25%" } : { startOffset: "50%" },
          opacity: 1,
          duration: 2,
          ease: "power3.out",
        },
        0,
      );

      const tl3 = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center-=200 center",
          end: "bottom-=200 bottom",
          markers: false,
          invalidateOnRefresh: true,
          scrub: 1,
        },
      });
      tl3.to("#text1", {
        attr: isMobile ? { startOffset: "-25%" } : { startOffset: "100%" },
        opacity: 0,
        duration: 1,
      });
      tl3.to(
        "#text2",
        {
          attr: isMobile ? { startOffset: "25%" } : { startOffset: "50%" },
          opacity: 1,
          duration: 1,
        },
        0,
      );

      const refreshTriggers = () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          trigger.refresh();
        });
      };

      const waitForImages = () => {
        const images = Array.from(containerRef.current.querySelectorAll("img"));

        if (images.length === 0) {
          refreshTriggers();
          return () => {};
        }

        const imagePromises = images.map(waitForSingleImage);

        Promise.all(imagePromises).then(() => {
          const timer = setTimeout(refreshTriggers, 500);
          timers.push(timer);
        });

        const fallbackTimer = setTimeout(refreshTriggers, 2000);
        timers.push(fallbackTimer);

        let readyTimer;
        const onWindowLoad = () => {
          readyTimer = setTimeout(refreshTriggers, 500);
          timers.push(readyTimer);
        };

        if (document.readyState === "complete") {
          onWindowLoad();
        } else {
          window.addEventListener("load", onWindowLoad, { once: true });
        }

        return () => {
          window.removeEventListener("load", onWindowLoad);
        };
      };

      waitForImages();

      const delayedRefreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
      timers.push(delayedRefreshTimer);
    }, containerRef.current);
  } catch (error) {
    console.error("Error en CasosExitoAnimation:", error);
  }

  // Retornar función de cleanup
  return () => {
    // Limpiar todos los timers
    timers.forEach((timer) => clearTimeout(timer));
    timers = [];

    // Destruir ScrollTriggers creados en este contexto
    if (ctx) {
      ctx.revert();
    }

    // Limpiar todos los ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === containerRef.current) {
        trigger.kill();
      }
    });
  };
}
