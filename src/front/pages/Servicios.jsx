import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import instalacionElectrica from "../assets/img/instalacion-electrica.png";
import cuadroElectrico from "../assets/img/cuadro-electrico.png";
import domotica from "../assets/img/domotica.png";
import videoportero from "../assets/img/videoportero.png";
import vehiculoElectrico from "../assets/img/punto-de-carga-para-vehiculos-electrico.png";

const servicios = [
  {
    titulo: "Instalaciones y Renovaciones Eléctricas",
    descripcion: "Obras en viviendas, locales comerciales y comunidades (nuevas acometidas, reformas integrales y actualizaciones).",
    imagen: instalacionElectrica,
  },
  {
    titulo: "Cuadros, Boletines y Certificaciones",
    descripcion: "Cambio o renovación de cuadros eléctricos, emisión de boletines y certificados oficiales para legalización.",
    imagen: cuadroElectrico,
  },
  {
    titulo: "Iluminación y Domótica",
    descripcion: "Proyectos LED de interior y exterior, así como sistemas inteligentes de automatización del hogar.",
    imagen: domotica,
  },
  {
    titulo: "Control de Acceso y Seguridad",
    descripcion: "Instalación de porteros automáticos, videoporteros y soluciones integrales de accesos.",
    imagen: videoportero,
  },
  {
    titulo: "Movilidad Eléctrica y Servicios para Comunidades",
    descripcion: "Puntos de carga para vehículos eléctricos y mantenimiento eléctrico especializado para comunidades de vecinos.",
    imagen: vehiculoElectrico,
  },
];

const ServicioBlock = ({ servicio, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    }
  }, [inView]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`servicio-block ${isEven ? 'normal' : 'reverse'}`}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <img src={servicio.imagen} alt={servicio.titulo} className="servicio-img" />
      <div className="servicio-texto">
        <h2>{servicio.titulo}</h2>
        <p>{servicio.descripcion}</p>
      </div>
    </motion.div>
  );
};

export const Servicios = () => {
  return (
    <section className="servicios-section">
      <h1>Soluciones Eléctricas Profesionales en Cádiz</h1>
      {servicios.map((servicio, i) => (
        <ServicioBlock key={i} servicio={servicio} index={i} />
      ))}
    </section>
  );
};