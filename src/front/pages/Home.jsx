import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Helmet } from "react-helmet-async";
import banner from "../assets/img/banner.png";
import { FaPhoneAlt, FaFileAlt } from "react-icons/fa";
import { Servicios } from "../pages/Servicios.jsx"

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL;
			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

			const response = await fetch(backendUrl + "/api/hello");
			const data = await response.json();

			if (response.ok) dispatch({ type: "set_hello", payload: data.message });

			return data;
		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}
	};

	useEffect(() => {
		loadMessage();
	}, []);

	return (
		<>
			<Helmet>
				<title>Electrotel | Instalaciones Eléctricas Profesionales</title>
				<meta name="description" content="Instaladores eléctricos autorizados en Ciudad Real. Pide presupuesto online sin registro para tu vivienda, local o comunidad." />

				{/* Open Graph */}
				<meta property="og:title" content="Electrotel | Instalaciones Eléctricas Profesionales" />
				<meta property="og:description" content="Servicios eléctricos, boletines, domótica, cargadores eléctricos y más. Presupuesto online sin registro." />
				<meta property="og:image" content="https://www.tudominio.com/img/banner-og.jpg" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.tudominio.com/" />

				{/* Twitter Card */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Electrotel | Instalaciones Eléctricas Profesionales" />
				<meta name="twitter:description" content="Presupuestos eléctricos online en Ciudad Real sin registro." />
				<meta name="twitter:image" content="https://www.tudominio.com/img/banner-og.jpg" />
			</Helmet>
			<div className="banner-container">
				<img src={banner} alt="Electrotel instalaciones eléctricas" className="banner-img" />
				<div className="banner-buttons">
					<button className="banner-btn call-btn">
						<FaPhoneAlt className="me-1" />
						Llamar
					</button>
					<button className="banner-btn email-btn">
						<FaFileAlt className="me-1" />
						Presupuesto Online
					</button>
				</div>
			</div>
			<Servicios />
		</>
	);
};

