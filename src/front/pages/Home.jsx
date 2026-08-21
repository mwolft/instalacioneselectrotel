import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Helmet } from "react-helmet-async";
import { Servicios } from "../pages/Servicios.jsx";
import { ContactoHome } from "../components/ContactoHome.jsx"
import AboutMe from "../components/AboutMe.jsx";
import Hero from "../components/Hero.jsx";
import Carousel from "../components/Carousel.jsx";
import CasosExito from "../components/CasosExito.jsx";
import wallboxAc from '../assets/img/wallbox-ac.png';


export const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL;
			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

			const response = await fetch(backendUrl + "/api/hello");
			const data = await response.json();

			if (response.ok) dispatch({ type: "set_hello", payload: data.message });
			return data;
		} catch (error) {
			throw new Error("Error al conectar con el backend.");
		}
	};

	useEffect(() => {
		loadMessage();
	}, []);

	return (
		<>
			<Helmet>
				<title>Electrotel | Instalaciones Eléctricas Profesionales</title>
				<meta name="description" content="Instaladores eléctricos autorizados en el Puerto de Santa María, Cádiz. Pide presupuesto online ahora." />
				<meta property="og:title" content="Instalaciones Eléctricas Profesionales" />
				<meta property="og:description" content="Servicios eléctricos, boletines, domótica, cargadores eléctricos y más. Presupuesto online." />
				<meta property="og:image" content="https://res.cloudinary.com/dewanllxn/image/upload/v1745981667/electricista_en_el_Puerto_de_Santa_Maria_vf9lb6.jpg" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://instalacioneselectrotel.es" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Instalaciones Eléctricas Profesionales" />
				<meta name="twitter:description" content="Presupuestos eléctricos online en el Puerto de Santa María, Cádiz." />
				<meta name="twitter:image" content="https://res.cloudinary.com/dewanllxn/image/upload/v1745981667/electricista_en_el_Puerto_de_Santa_Maria_vf9lb6.jpg" />
			</Helmet>

			<Hero />
			<div className="2xl:h-120 xl:h-180 h-70 flex flex-col justify-end items-center w-full gap-2 pb-10">
				<h1 className="lg:text-7xl text-[36px] font-bold text-center lg:leading-20 leading-9">INSTALACIONES ELECTROTEL</h1>
				<h3 className="text-xl font-semibold text-center lg:leading-10 leading-5">Expertos en corriente, especialistas en confianza.</h3>
				<div className="flex flex-row justify-center items-center w-screen color-yellow mt-3">
					<h4>Dómotica | </h4>
					<h4>Instalaciones | </h4>
					<h4>Suministros | </h4>
					<h4>Boletines</h4>
				</div>
			</div>

			<div className="w-full flex items-center">
				<Carousel
					slides={[
						{
							src: "https://res.cloudinary.com/dewanllxn/image/upload/v1745981667/electricista_en_el_Puerto_de_Santa_Maria_vf9lb6.jpg",
							alt: "Electricista en el Puerto de Santa María",
							caption: "Electricista profesional en el Puerto de Santa María, Cádiz",
						},
						{
							src: "https://res.cloudinary.com/dewanllxn/image/upload/v1745981667/instalaciones_electricas_en_el_Puerto_de_Santa_Maria_uxv6tm.jpg",
							alt: "Instalaciones eléctricas en el Puerto de Santa María",
							caption: "Instalaciones eléctricas seguras y certificadas",
						},
						{
							src: "https://res.cloudinary.com/dewanllxn/image/upload/v1745981667/boletin_electrico_en_el_Puerto_de_Santa_Maria_jhxz9r.jpg",
							alt: "Boletín eléctrico en el Puerto de Santa María",
							caption: "Boletines eléctricos oficiales y homologados",
						},
					]}

				/>
			</div>
			<AboutMe />
			<Servicios />
			<CasosExito />
			<ContactoHome />


		</>
	);
};
