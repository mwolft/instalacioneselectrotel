import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { marker } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

export function useServiceAnimationAdvanced(sectionRef, currentIndex, totalSlides, onNavigate) {
    const triggerDownRef = useRef(null);
    const observerRef = useRef(null);
    const progressRef = useRef(0);  // Track scroll progress (0 to 1)
    const lastSlideRef = useRef(0);  // Track last triggered slide
    const timelineRef = useRef(null);  // Timeline para controlar el progreso

    // Actualizar el ref cuando currentIndex cambia
    useEffect(() => {
        lastSlideRef.current = currentIndex;
    }, [currentIndex]);


    useEffect(() => {
        if (!sectionRef?.current) return;

        const createTriggers = () => {

            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.id === "triggerDown") {
                    trigger.kill();
                }
            });

            // Crear una timeline que controla el progreso del scroll
            timelineRef.current = gsap.timeline();

            // Animar un objeto de 0 a totalSlides-1 que representa el progreso
            timelineRef.current.to(progressRef, {
                current: totalSlides - 1,
                duration: totalSlides - 1,  // Duración basada en número de slides
                ease: "none",
                onUpdate: () => {
                    const progress = progressRef.current;
                    const newSlide = Math.round(progress);

                    // Solo disparar navegación si cambió el slide
                    if (newSlide !== lastSlideRef.current) {
                        const direction = newSlide > lastSlideRef.current ? 'next' : 'prev';
                        lastSlideRef.current = newSlide;
                        onNavigate?.(direction);
                    }
                }
            }, 0);

            // TRIGGER: Pinea el componente y controla el scrub
            triggerDownRef.current = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${(totalSlides - 1) * 300}px`,  // Más espacio para scrollear a través de slides
                scrub: 1.2,  // Scrub para vincular scroll con animación (1.2 = lag suave)
                pin: true,  // Pinea el componente
                anticipatePin: 1,
                id: "triggerDown",
                animation: timelineRef.current,
            });

            // Recalcula posiciones de triggers después de que todo cargue
            ScrollTrigger.refresh();
        };

        // Espera a que la página cargue completamente (imágenes, etc)
        if (document.readyState === "complete") {
            // La página ya está cargada
            createTriggers();
        } else {
            // Espera a que cargue todo
            window.addEventListener("load", createTriggers);
        }

        // Cleanup
        return () => {
            window.removeEventListener("load", createTriggers);
            triggerDownRef.current?.kill();
            observerRef.current?.kill();
            timelineRef.current?.kill();
        };
    }, [sectionRef, onNavigate]);  //sectionRef + onNavigate (ya memoizado en padre)


}