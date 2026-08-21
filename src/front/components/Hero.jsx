import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { slideUpLeft } from '../animations';
import { gsap } from "gsap";
import HeroAnimation from '../animations/hero';
import heroBg from '../assets/img/hero-bg.jpg';
import fondoHero from '../assets/img/fondo-hero.jpg';
import paloElectrico from '../assets/img/palo-electrico.png';
import './hero.css';

export default function Hero() {
    const fondoRef = useRef(null);
    const contenedorRef = useRef(null);
    const descriptionRef = useRef(null);
    const paloElectricoRef = useRef(null);
    const contentWrapperRef = useRef(null);

    const frase = "SOLUCIONES ELÉCTRICAS PROFESIONALES"
    useEffect(() => {
        // Definimos el estado inicial de CSS para asegurar que no se vea antes de que cargue JS
        gsap.set(fondoRef.current, {
            clipPath: "inset(0% 0% 100% 0%)",
        });
    }, []);

    useEffect(() => {
        const cleanup = HeroAnimation({ fondoRef, contenedorRef, descriptionRef, paloElectricoRef, contentWrapperRef });
        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <section
            id="hero-section"
            className="relative w-full h-auto flex flex-col justify-center items-center text-center lg:p-4 gap-4 z-0"
            style={{
                backgroundImage: `url("https://res.cloudinary.com/dhzttglcb/image/upload/v1777999295/hero-bg_uimd5r.jpg")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <div id="hero-content" className="flex flex-col h-250 mt-20 lg:mt-10 w-full lg:h-screen lg:justify-between lg:gap-2 justify-between items-center text-center lg:p-4 ">
                <div ref={contentWrapperRef} className="flex flex-col lg:gap-6 gap-4 w-full lg:w-[calc(100%-3rem)] lg:justify-start lg:mx-5 lg:mt-5 justify-center items-center lg:items-start lg:text-start z-1 mb-10" >
                    <div className="flex flex-row justify-center mb-2 lg:gap-2">
                        <FaMapMarkerAlt className="text-blue-600 mr-2" size={24} aria-hidden="true" />
                        <h3 className="text-[16px] md:text-xl">El Puerto de Santa maria</h3>
                    </div>
                    <h1 ref={contenedorRef} className="text-[36px] md:text-[90px] text-gray-950 leading-none font-ultra overflow-visible" style={{ display: 'inline-block', width: 'auto', whiteSpace: 'normal' }}>{frase.split(" ").map((palabra, wordIndex, arr) => (
                        <span key={wordIndex} style={{ display: 'inline-block', marginRight: wordIndex === arr.length - 1 ? '0' : '10px' }}>
                            {palabra.split("").map((letra, letterIndex) => (
                                <span
                                    key={`${wordIndex}-${letterIndex}`}
                                    className="letra"
                                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                                >
                                    {letra}
                                </span>
                            ))}
                        </span>
                    ))}
                    </h1>
                    <h2 ref={descriptionRef} className="text-[16px] md:text-[24px] max-w-250">Desarrollamos e implementamos proyectos eléctricos confiables para hogares, comercios e industria, garantizando resultados duraderos y seguros.</h2>
                    <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-start lg:mt-6 lg:gap-15 gap-2">
                        <a
                            href="#contacto"
                            className="flex items-center w-fit lg:text-[42px] text-[16px] h-11 font-bold justify-start transform transition-colors duration-200 hover:bg-blue-50 hover:border-blue-700"
                        >
                            CONTÁCTANOS
                        </a>
                        <a
                            href="/presupuesto"
                            className="flex w-full lg:w-full lg:text-[42px] text-[16px] h-11 lg:justify-start p-4 bg-gray-900 text-amber-50 font-bold justify-center items-center transform transition-colors duration-200 hover:-rotate-3 hover:bg-blue-700"
                        >
                            PRESUPUESTO ONLINE
                        </a>
                    </div>
                </div>


                <div className="relative h-120 w-screen lg:w-screen flex justify-center items-center lg:aspect-square z-10" style={{ clipPath: 'inset(-1000px 0 0 0)' }}>
                    {// Imagen abajo de los botones
                    }
                    <img
                        ref={fondoRef}
                        className="absolute w-full h-full object-cover"
                        src="https://res.cloudinary.com/dhzttglcb/image/upload/v1777999296/fondo-hero_p8mxbl.jpg"
                        alt="Fondo de hero"
                        loading="lazy"
                    />

                    {// Imagen de cabina
                    }
                    <img
                        className="absolute lg:right-20 2xl:h-290 xl:h-220 h-200 w-auto pointer-events-none max-w-none"
                        src="https://res.cloudinary.com/dhzttglcb/image/upload/v1777999295/palo-electrico_q1ztjy.png"
                        ref={paloElectricoRef}
                        alt="Palo eléctrico"
                        loading="lazy"
                    />

                </div>



            </div>
        </section>
    );
}