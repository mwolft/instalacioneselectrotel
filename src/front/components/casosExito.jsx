import mascara1 from '../assets/img/mascara-2.png';
import logoSVG from '../assets/img/electricista.svg';
import fondoMascara1 from '../assets/img/fondo-mascara-2.png';
import mercado from '../assets/img/mercado.jpg';
import logo from '../assets/img/ribera.png';
import heroBg from '../assets/img/hero-bg.jpg';
import CasosExitoAnimation from '../animations/casosExito';
import { useEffect, useRef, useState } from 'react';
import { useGlobalState } from '../hooks/useGlobalReducer';

export default function CasosExito() {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Definimos el media query (768px es el estándar de 'md' en Tailwind)
        const mediaQuery = window.matchMedia('(max-width: 768px)');

        // Función para actualizar el estado
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
        };

        // Establecemos el valor inicial
        setIsMobile(mediaQuery.matches);

        // Escuchamos los cambios
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        // Limpieza al desmontar el componente
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    useEffect(() => {
        const cleanup = CasosExitoAnimation(containerRef, imageRef, isMobile);
        return () => {
            if (cleanup) cleanup();
        };
    }, [isMobile]);

    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const ac = new AbortController();

        const load = async () => {
            setLoading(true);
            try {
                const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:3000';
                const res = await fetch(`${API_BASE}/api/csv`, { signal: ac.signal });

                if (!res.ok) throw new Error('Error en la carga');

                const csvData = await res.json();

                // Accedemos a la clave exacta del JSON (con espacios y tildes)
                const casosData = csvData["Casos de éxito"] || [];

                const mapped = casosData.map((item) => ({
                    empresa: item["Empresa"] || '',
                    urlImg: item["URL Foto trabajo"] || '', // Foto del trabajo realizado
                    urlLogo: item["URL Foto empresa"] || '' // Logo de la empresa
                }));

                setSlides(mapped);

            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error fetching:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        load();
        return () => ac.abort();
    }, []);

    return (
        <section className={`h-auto w-screen flex lg:flex-row flex-col items-start bg-url(${heroBg}) bg-cover bg-center relative overflow-hidden`} ref={containerRef}>
            <div className="lg:h-screen lg:w-150 h-60 w-screen lg:absolute lg:left-0 flex flex-col justify-center lg:items-center items-end lg:z-0 z-40 background-white" ref={imageRef}>
                <svg width={isMobile ? "118%" : "100%"} height={isMobile ? "122%" : "100%"} viewBox="0 0 400 400" className="absolute inset-0">
                    <defs>
                        <path
                            id="circlePath"
                            d={isMobile ? "M -20, 70 m 0, 0 a 180,180 0 1,0 360,0 a 180,180 0 1,0 -360,0" : "M 0, 200 m -180, 0 a 180,180 0 1,1 360,0 a 180,180 0 1,1 -360,0"}
                            fill="none"
                        />
                    </defs>
                    <g id="textGroup">
                        <text fontSize="28" fontWeight="bold" fill="currentColor">
                            <textPath id='text1' href="#circlePath" startOffset={isMobile ? "50%" : "0%"} textAnchor="middle">
                                CONFIAN EN NOSOTROS
                            </textPath>
                            <textPath id='text2' href="#circlePath" startOffset={isMobile ? "100%" : "0%"} textAnchor="middle">
                                HAZLO POSIBLE CON ELECTROTEL
                            </textPath>
                        </text>
                    </g>
                </svg>
                <a href='/mi-enlace' className="logoIzquierda absolute top-[-14.4rem] lg:top-0 lg:right-140 h-full w-full z-10 ">
                    <img src={logoSVG} alt="Imagen logo" className=" h-full w-full object-contain filter grayscale hover:pointer" />
                </a>
            </div>

            <div className='grid grid-rows-4 grid-cols-8 w-screen h-400 justify-items-center z-10 lg:py-4 lg:pr-8 gap-4'>

                {/*1*/}
                <div className='h-full w-full col-start-1 lg:col-start-4 col-span-1 row-start-1 relative overflow-visible'>
                    <img src={slides[0]?.urlLogo} alt={slides[0]?.Empresa} className='h-full w-[100px] max-w-none lg:w-full object-contain absolute z-10 lg:mx-0' style={isMobile ? { right: '-220%' } : { right: '-25%' }} />
                </div>
                <div className='h-full w-full lg:col-start-5  col-start-1 col-span-8 lg:col-span-4 row-start-1 relative'>
                    <img src={slides[0]?.urlImg} alt={slides[0]?.Empresa} className='h-full w-full object-cover' />
                    <div className='absolute inset-0 pointer-events-none' style={isMobile ? { background: 'linear-gradient(-105.5deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 65%)', } : {
                        background: 'linear-gradient(-105.5deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 80%)',
                    }} />
                </div>
                {/*2*/}
                <div className='h-full w-full col-start-8 col-span-1 row-start-2 relative overflow-visible z-10'>
                    <img src={slides[1]?.urlLogo} alt={slides[1]?.Empresa} className='absolute h-full lg:w-full w-[100px] max-w-none object-contain z-10' style={isMobile ? { left: '-220%' } : { left: '-25%' }} />
                </div>
                <div className='h-full w-full col-start-1 lg:col-start-4 row-start-2 col-span-8 lg:col-span-4 justify-self-end relative'>
                    <img
                        src={slides[1]?.urlImg}
                        alt={slides[1]?.Empresa}
                        className='h-full w-full object-cover'
                    />
                    <div className='absolute inset-0 pointer-events-none' style={isMobile ? { background: 'linear-gradient(105.5deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 65%)', } : {
                        background: 'linear-gradient(105deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 80%)'
                    }} />
                </div>
                {/*3*/}
                <div className='h-full w-full lg:col-start-4 col-start-1 col-span-1 row-start-3 relative'>
                    <img src={logo} alt="Mercado" className='h-full w-[100px] max-w-none lg:w-full object-contain absolute z-10 lg:mx-0' style={isMobile ? { right: '-220%' } : { right: '-25%' }} />
                </div>
                <div className='h-full w-full lg:col-start-5 col-start-1 col-span-8 row-start-3 lg:col-span-4 justify-self-end relative'>
                    <img src={mercado} alt="Mercado" className='h-full w-full object-cover' />
                    <div className='absolute inset-0 pointer-events-none' style={isMobile ? { background: 'linear-gradient(-105.5deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 65%)', } : {
                        background: 'linear-gradient(-105.5deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 80%)',
                    }} />
                </div>
                {/*4*/}
                <div className='h-full w-full col-start-8 col-span-1 row-start-4 relative overflow-visible z-10'>
                    <img src={logo} alt="Mercado" className='absolute h-full lg:w-full w-[100px] max-w-none object-contain z-10' style={isMobile ? { left: '-220%' } : { left: '-25%' }} />
                </div>
                <div className='h-full w-full col-start-1 col-span-8 lg:col-start-4 row-start-4 lg:col-span-4 justify-self-end relative'>
                    <img src={mercado} alt="Mercado" className='h-full w-full object-cover' />
                    <div className='absolute inset-0 pointer-events-none' style={isMobile ? { background: 'linear-gradient(105.5deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 65%)', } : {
                        background: 'linear-gradient(105deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 80%)'
                    }} />
                </div>

            </div>

        </section>
    );
}