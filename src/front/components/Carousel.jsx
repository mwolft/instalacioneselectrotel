import React, { useState, useEffect, useRef } from "react";
import EmblaCarousel from "embla-carousel";
import TarjetaGrid from "./TarjetaGrid";
import cuadro from "../assets/img/cuadro-empresas.jpg";
import puntoRecarga from "../assets/img/punto-recarga.jpeg";
import suministros from "../assets/img/suministros-electricos.jpg";
import { useGlobalState } from "../hooks/useGlobalReducer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Carousel() {
    const emblaRef = useRef(null);
    const [emblaApi, setEmblaApi] = useState(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // nuevo: flex-basis responsivo para mostrar "parte" del siguiente slide
    const [basis, setBasis] = useState("calc(100% / 3.5)");


    useEffect(() => {
        const updateBasis = () => {
            const w = window.innerWidth;
            // Tailwind: sm >= 640, md >= 768
            if (w >= 768) {
                // md+ : mostrar ~3.5 slides
                setBasis("calc(100% / 3.5)");
            } else if (w >= 640) {
                // sm : mostrar 2 y un poco de la 3ª
                setBasis("calc(100% / 2.2)");
            } else {
                // móvil : mostrar 1 y un poco de la 2ª
                setBasis("calc(100% / 1.15)");
            }
        };

        updateBasis();
        window.addEventListener("resize", updateBasis);
        return () => window.removeEventListener("resize", updateBasis);
    }, []);

    const [slides, setSlides] = useState([]);
    const { state, dispatch } = useGlobalState();


    // fetch slides from API and map image by keyword
    useEffect(() => {
        if (state.data.length > 0) return setSlides(state.data);

        const ac = new AbortController();
        const load = async () => {
            dispatch({ type: 'FETCH_START' });
            try {
                const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || 'http://127.0.0.1:3000';
                const res = await fetch(`${API_BASE}/api/csv`, { signal: ac.signal });
                dispatch({ type: 'FETCH_SUCCESS', payload: [] });

                if (!res.ok) {
                    const txt = await res.text().catch(() => String(res.status));
                    dispatch({ type: 'FETCH_ERROR', payload: txt });
                    throw new Error('Failed to fetch slides: ' + txt);
                }
                const csvData = await res.json();
                const carouselData = csvData.Carrousel || [];
                const mapped = carouselData.map((item) => {
                    const title = item.Titulo || item.titulo || item.TITLE || '';
                    const description = item.Descripcion || item["Descripción"] || item.DESCRIPCION || '';
                    const urlField = item["URL Foto"] || item.URL || item.Url || item.url || '';
                    const type = item["TIPO"] || item.Tipo || item.TYPE || '';
                    // choose image by keyword
                    const low = title.toLowerCase();
                    let img = cuadro;
                    if (low.includes('recarga') || low.includes('recarg')) img = puntoRecarga;
                    else if (low.includes('suministr') || low.includes('suministro')) img = suministros;
                    return { url: urlField || img, text: title, description, type };
                });
                setSlides(mapped);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Failed to load slides', err);
                }
            }
        };
        load();
        return () => ac.abort();
    }, []);

    // init/reinit Embla when slides change
    useEffect(() => {
        if (!emblaRef.current) return;
        if (emblaApi) {
            try { emblaApi.destroy(); } catch (e) { }
            setEmblaApi(null);
        }
        const embla = EmblaCarousel(emblaRef.current, { loop: true, align: 'start', containScroll: 'trimSnaps' });
        setEmblaApi(embla);

        const onSelect = () => {
            setCanScrollPrev(embla.canScrollPrev());
            setCanScrollNext(embla.canScrollNext());
        };

        embla.on('select', onSelect);
        embla.on('dragStart', () => setIsDragging(true));
        embla.on('dragEnd', () => setIsDragging(false));
        onSelect();

        return () => embla.destroy();
    }, [slides]);

    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, [slides, basis]);

    return (
        <div className="w-full h-full flex items-center justify-center py-4">
            <div className={`overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            // usa la variable responsiva 'basis'
                            style={{ flex: `0 0 ${basis}` }}
                            className="min-w-0 mr-4"
                        >
                            <TarjetaGrid
                                url={slide.url}
                                text={slide.text}
                                descripcion={slide.description}
                                type={slide.type}
                                className="w-full h-80 rounded-lg shadow-lg overflow-hidden"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}