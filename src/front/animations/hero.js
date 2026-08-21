import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroAnimation(ref) {
  if (!ref.contenedorRef.current) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

    // Animación de letras
    tl.fromTo(
      ".letra",
      { opacity: 0, y: 20 },
      { duration: 1, opacity: 1, y: 0, stagger: 0.05, ease: "back.out(1.7)" },
      0.5,
    );

    // Animación de descripción
    tl.fromTo(
      ref.descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)" },
      1.2,
    );

    // Animación del fondo
    tl.to(
      ref.fondoRef.current,
      {
        duration: 1.5,
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power2.inOut",
        delay: 0.5,
      },
      0,
    );

    // Animación del palo eléctrico
    tl.fromTo(
      ref.paloElectricoRef.current,
      { opacity: 0, y: 0 },
      { opacity: 1, y: -20, duration: 1, ease: "back.out(1.7)" },
    );

    // ScrollTrigger para pinear el contenedor de contenido
    ScrollTrigger.create({
      trigger: ref.fondoRef.current,
      start: "top center+=150",
      end: "bottom center+=150",
      pin: ref.contentWrapperRef.current,
      pinSpacing: false,
      markers: false,
      invalidateOnRefresh: true,
    });

    gsap.fromTo(
      ref.contentWrapperRef.current,
      {
        filter: "blur(0px)",
        opacity: 1,
      },
      {
        filter: "blur(15px)",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ref.fondoRef.current,
          start: "top center+=150",
          end: "bottom center+=150",
          scrub: true,
          markers: false,
          invalidateOnRefresh: true,
        },
      },
    );
  }, ref.contenedorRef);

  return () => ctx.revert();
}
