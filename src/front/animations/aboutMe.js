import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const waitForSingleImage = (img) => {
  if (img.complete) return Promise.resolve();

  return new Promise((resolve) => {
    img.addEventListener("load", resolve, { once: true });
    img.addEventListener("error", resolve, { once: true });
  });
};

export default function AboutMeAnimation(ref) {
  if (!ref?.sectionRef?.current) return;

  const triggerEl = ref.fondoRef?.current ?? ref.sectionRef.current;
  let cleanupImageWait = () => {};
  let delayedRefreshTimer;

  const ctx = gsap.context(() => {
    // Create a timeline that is directly controlled by ScrollTrigger (scrub)
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: triggerEl,
        start: "top-=100 center",
        end: "top+=100 center",
        scrub: true,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    if (ref.fondoRef?.current) {
      tl.fromTo(
        ref.fondoRef.current,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", opacity: 1 },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 1,
        },
        0,
      );
    }

    // Create a second, independent ScrollTrigger/timeline for a text element
    // This timeline is separate from `tl` and won't interfere with the fondo animation
    // Scrolling Typography: Conveyor Belt Effect
    const triggerText = ref.textRef?.current ?? null;
    const triggerText2 = ref.text2Ref?.current ?? null;
    const imgWallbox = ref.imgWallbox?.current ?? null;

    if (triggerText && ref.fondoRef?.current) {
      // Select all word-spans inside the text element
      const words = triggerText.querySelectorAll("span");
      const words2 = triggerText2
        ? triggerText2.querySelectorAll("span")
        : words;
      if (words.length > 0) {
        // Get the wrapper container (the h2 element)
        const container = triggerText;
        const container2 = triggerText2 ?? container;
        const centerX = window.innerWidth / 2;

        // Ensure spans are inline-block so clipPath and transforms work reliably
        const allWords = Array.from(
          new Set([...Array.from(words), ...Array.from(words2)]),
        );
        if (allWords.length > 0)
          gsap.set(allWords, { display: "inline-block" });

        // Hide container2 initially
        gsap.set(container2, { autoAlpha: 0 });

        const tlText = gsap.timeline({
          scrollTrigger: {
            trigger: ref.fondoRef.current,
            start: "top top",
            end: `+=${words.length * 300}px`,
            scrub: true,
            pin: ref.fondoRef.current,
            markers: false,
            anticipatePin: 1,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });

        // Hide container initially and set up words for animation
        gsap.set(container, { autoAlpha: 0 });
        gsap.set(words, { x: 300, autoAlpha: 0 });

        // Set initial position to center the first word
        const firstWord = words[0];
        const firstWordCenterX =
          firstWord.offsetLeft + firstWord.offsetWidth / 2;
        gsap.set(container, { x: centerX + firstWordCenterX });

        // Animate each word with conveyor belt effect
        // Each word moves to the center of the viewport
        // Words start 1 second after title animation completes
        words.forEach((word, index) => {
          if (index === 0) {
            tlText.set(container, { autoAlpha: 1 }, ">1");
          }

          // 1. La palabra entra desde la derecha
          tlText.fromTo(
            word,
            { x: 100, autoAlpha: 0 }, // Reducido de 300 a 100 para que sea menos brusco
            { x: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" },
            index === 0 ? ">1" : ">0.5",
          );

          // 2. El contenedor se mueve SOLO LO NECESARIO
          tlText.to(
            container,
            {
              x: () => {
                if (index === 0)
                  return centerX - (word.offsetLeft + word.offsetWidth / 2);

                // CÁLCULO CLAVE:
                // En lugar de una fórmula compleja, restamos un valor fijo por palabra
                // para que la 'cinta' avance de forma constante.
                const gapBetweenWords = 140; // <--- AJUSTA ESTO: Menos valor = menos movimiento a la izquierda
                const initialPos =
                  centerX - (words[0].offsetLeft + words[0].offsetWidth / 2);

                return initialPos - index * gapBetweenWords;
              },
              duration: 1,
              ease: "power3.inOut",
            },
            "<",
          );
        });
        tlText.to(
          container,
          {
            opacity: 1,
            duration: 1,
          },
          "+=1",
        );

        tlText.to(
          container,
          {
            y: -100,
            duration: 1,
            ease: "power3.inOut",
          },
          ">",
        );

        tlText.to(
          imgWallbox,
          {
            y: -50,
            opacity: 1,
            duration: 1,
            ease: "power3.inOut",
          },
          ">",
        );

        // Scale down the background section during the timeline
        tlText.to(ref.fondoRef.current, {
          scale: 0.6,
          transformOrigin: "center center",
          duration: 1,
        });
      }
    }

    // Refresh ScrollTrigger after images/elements load to recalculate positions
    const refreshTriggers = () => {
      ScrollTrigger.refresh();
    };
    const normalizeScroll = () => {
      ScrollTrigger.normalizeScroll(true);
    };

    // Wait for all images in the section to load
    const waitForImages = () => {
      const images = Array.from(ref.sectionRef.current.querySelectorAll("img"));

      if (images.length === 0) {
        refreshTriggers();
        normalizeScroll();
        return () => {};
      }

      const imagePromises = images.map(waitForSingleImage);

      Promise.all(imagePromises).then(refreshTriggers);

      const fallbackTimer = setTimeout(refreshTriggers, 2000);
      let readyTimer;
      const onWindowLoad = () => {
        readyTimer = setTimeout(refreshTriggers, 500);
      };

      if (document.readyState === "complete") {
        onWindowLoad();
      } else {
        window.addEventListener("load", onWindowLoad);
      }

      return () => {
        clearTimeout(fallbackTimer);
        if (readyTimer) clearTimeout(readyTimer);
        window.removeEventListener("load", onWindowLoad);
      };
    };

    cleanupImageWait = waitForImages();

    // Additional refresh after a small delay to ensure GSAP recalculates layout correctly
    delayedRefreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  }, ref.sectionRef.current);

  return () => {
    cleanupImageWait();
    if (delayedRefreshTimer) clearTimeout(delayedRefreshTimer);
    ctx.revert();
  };
}
