import { useEffect, useRef } from 'react';
import wallBox from '../assets/img/wallbox-ac.png';
import AboutMeAnimation from '../animations/aboutMe';


export default function AboutMe() {
    const fondoRef = useRef(null);
    const textRef = useRef(null);
    const text2Ref = useRef(null);
    const frase = "Garantizamos eficiencia, seguridad y confianza a largo plazo";
    const frase2 = "Energía segura. Instalaciones precisas. Confianza que perdura";
    const words = ["Garantizamos eficiencia,", "seguridad", "y confianza a largo plazo"];
    const words2 = ["Energía segura.", "Instalaciones precisas.", "Confianza que perdura."]; // Dividimos la frase en palabras para animarlas individualmente
    const imgWallbox = useRef(null);

    useEffect(() => {
        const cleanup = AboutMeAnimation({ sectionRef: fondoRef, fondoRef, textRef: textRef, text2Ref: text2Ref, imgWallbox: imgWallbox });
        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <section className="relative z-20 flex flex-col h-screen w-full gap-2 justify-center items-center" ref={fondoRef}>
            <section className="seccionFondo relative h-screen gap-2 flex flex-col justify-center items-center overflow-hidden">
                {/* Video de fondo */}
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="https://res.cloudinary.com/dhzttglcb/video/upload/v1777999320/Bombilla_ha22sa.mp4" type="video/mp4" />
                    Tu navegador no soporta videos HTML5
                </video>

                {/* Overlay oscuro opcional para mejor legibilidad */}
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                {/* Contenido superpuesto */}
                <div className="relative z-10 flex flex-col justify-center items-center w-full h-20 gap-4">

                    <h2 className='lg:text-4xl text-xl text-white font-bold flex items-center justify-start w-screen gap-4 opacity-0 h-20' ref={textRef}>{words.map((word, index) => (
                        <span className="whitespace-nowrap flex-shrink-0 h-15" key={`${word}-${index}`}>{word}</span>
                    ))}</h2>

                    <img src={wallBox} alt="WallBox" className="lg:w-80 w-50 opacity-0" ref={imgWallbox} />

                </div>
            </section>
        </section>
    );
}