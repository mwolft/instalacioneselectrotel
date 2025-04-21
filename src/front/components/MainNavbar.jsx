import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../assets/img/electricista.png";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export const MainNavbar = () => {
	return (
		<>
			<div className="topbar bg-light border-bottom py-1">
				<Container fluid className="topbar-container d-flex justify-content-end align-items-center small">
					<a href="tel:+34600111222" className="contact-link d-flex align-items-center me-4">
						<FaPhoneAlt className="me-1" />
						<span>600 111 222</span>
					</a>
					<a href="mailto:info@electrotel.com" className="contact-link d-flex align-items-center me-4">
						<FaEnvelope className="me-1" />
						<span>info@electrotel.com</span>
					</a>
				</Container>
			</div>

			<Navbar expand="lg" className="bg-body-tertiary">
				<Container fluid>
					<Navbar.Brand href="#home">
						<img src={logo} alt="electricista cerca de ti" className="navbar-logo" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="#home" className="nav-link-custom">Home</Nav.Link>
							<Nav.Link href="#link" className="nav-link-custom">Servicios</Nav.Link>
							<Nav.Link href="#link" className="nav-link-custom">Proyectos</Nav.Link>
							<Nav.Link href="#link" className="nav-link-custom">Contacto</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};
