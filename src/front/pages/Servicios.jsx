import { useRef, useState, useCallback, useEffect } from "react";
import { useServiceAnimationAdvanced } from "../hooks/useServiceAnimationAdvanced";
import imagen1 from "../assets/img/1.png";
import imagen2 from "../assets/img/2.png";
import imagen3 from "../assets/img/3.png";
import imagen4 from "../assets/img/4.png";
import imagen5 from "../assets/img/5.png";
import { useGlobalState } from "../hooks/useGlobalReducer";

{/* const servicios = [
  {
    titulo: "Instalaciones y Renovaciones Eléctricas",
    descripcion: "Obras en viviendas, locales comerciales y comunidades (nuevas acometidas, reformas integrales y actualizaciones).",
    imagen: imagen1,
  },
  {
    titulo: "Cuadros, Boletines y Certificaciones",
    descripcion: "Cambio o renovación de cuadros eléctricos, emisión de boletines y certificados oficiales para legalización.",
    imagen: imagen2,
  },
  {
    titulo: "Iluminación y Domótica",
    descripcion: "Proyectos LED de interior y exterior, así como sistemas inteligentes de automatización del hogar.",
    imagen: imagen3,
  },
  {
    titulo: "Control de Acceso y Seguridad",
    descripcion: "Instalación de porteros automáticos, videoporteros y soluciones integrales de accesos.",
    imagen: imagen4,
  },
  {
    titulo: "Movilidad Eléctrica y Servicios para Comunidades",
    descripcion: "Puntos de carga para vehículos eléctricos y mantenimiento eléctrico especializado para comunidades de vecinos.",
    imagen: imagen5,
  },
]; */}


const ServicioBlock = ({ slide, index, isEven, currentIndex }) => {
  const isCurrentBlock = index === currentIndex;

  return (
    <div
      className={`servicio-block ${isEven ? 'normal' : 'reverse'}`}
      style={{
        opacity: isCurrentBlock ? 1 : 0,
        pointerEvents: isCurrentBlock ? 'auto' : 'none',
        transition: 'opacity 0.6s ease',
      }}
    >
      <img src={slide.urlImg} alt={slide.nombre} className="servicio-img" />
      <div className="servicio-texto">
        <h2>{slide.nombre}</h2>
        <p>{slide.descripcion}</p>
      </div>
    </div>
  );
};

export const Servicios = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useGlobalState();

  const sectionRef = useRef(null);

  const handleNavigate = useCallback((direction) => {
    if (direction === 'next') {
      setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
    } else if (direction === 'prev') {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [slides.length]);

  // Hook que controla scroll + rueda para navegar slides
  useServiceAnimationAdvanced(sectionRef, currentIndex, slides.length, handleNavigate);

  useEffect(() => {
    // Si ya se hizo fetch de Servicios, usar datos del estado global
    if (state.fetched.servicios) {
      setSlides(state.data.servicios);
      return;
    }

    const ac = new AbortController();

    const load = async () => {
      setLoading(true);
      dispatch({ type: 'FETCH_START' });
      try {
        const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:3000';
        const res = await fetch(`${API_BASE}/api/csv`, { signal: ac.signal });

        if (!res.ok) throw new Error('Error en la carga');

        const csvData = await res.json();

        // Accedemos a la clave exacta del JSON (con espacios y tildes)
        const serviciosData = csvData["Servicios"] || [];

        const mapped = serviciosData.map((item) => ({
          descripcion: item["DESCRIPCION"] || '',
          nombre: item["NOMBRE"] || '',
          urlImg: item["URL Foto"] || ''
        }));

        setSlides(mapped);
        dispatch({ type: 'FETCH_SUCCESS', payload: { type: 'servicios', data: mapped } });

      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching:', error);
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => ac.abort();
  }, [state.fetched.servicios, dispatch]);

  return (
    <section ref={sectionRef} className="servicios-section">
      {slides.map((slide, i) => (
        <ServicioBlock
          key={i}
          slide={slide}
          index={i}
          isEven={i % 2 === 0}
          currentIndex={currentIndex}
        />
      ))}
    </section>
  );
};