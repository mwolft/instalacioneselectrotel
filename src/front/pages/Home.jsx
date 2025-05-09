import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Helmet } from "react-helmet-async";
import banner from "../assets/img/banner.png";
import { FaPhoneAlt, FaFileAlt } from "react-icons/fa";
import { Servicios } from "../pages/Servicios.jsx";
import { ContactoHome } from "../components/ContactoHome.jsx"
import { WhatsAppWidget } from "../components/WhatsAppWidget.jsx";


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
				<meta property="og:title" content="Electrotel | Instalaciones Eléctricas" />
				<meta property="og:description" content="Servicios eléctricos, boletines, domótica, cargadores eléctricos y más. Presupuesto online." />
				<meta property="og:image" content="https://res.cloudinary.com/dewanllxn/image/upload/v1745981667/electricista_en_el_Puerto_de_Santa_Maria_vf9lb6.jpg" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://instalacioneselectrotel.es" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Electrotel | Instalaciones Eléctricas Profesionales" />
				<meta name="twitter:description" content="Presupuestos eléctricos online en el Puerto de Santa María, Cádiz." />
				<meta name="twitter:image" content="https://res.cloudinary.com/dewanllxn/image/upload/v1745981667/electricista_en_el_Puerto_de_Santa_Maria_vf9lb6.jpg" />
			</Helmet>

			<div className="banner-container">
				<img src="https://res.cloudinary.com/dewanllxn/image/upload/v1745980159/banner_itvoxt.png" alt="Electrotel instalaciones eléctricas en el Puerto de Santa María, Cádiz" className="banner-img" />
				<div className="banner-buttons">
					<a href="tel:+34614483128" className="banner-btn call-btn">
						<FaPhoneAlt className="me-1" />
						Llamar
					</a>
					<button className="banner-btn email-btn" onClick={() => navigate("/presupuesto")}>
						<FaFileAlt className="me-1" />
						Presupuesto Online
					</button>
				</div>
			</div>

			<Servicios />

			<ContactoHome />

			<WhatsAppWidget />

		</>
	);
};
