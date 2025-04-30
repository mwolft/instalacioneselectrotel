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
				<Container fluid className="topbar-container d-flex flex-wrap justify-content-end align-items-center small">
					<a href="tel:+34614483128" className="contact-link d-flex align-items-center me-3">
						<FaPhoneAlt className="me-1" />
						<span style={{ fontSize: "0.85rem" }}>614 48 31 28</span>
					</a>
					<a href="mailto:instalacioneselectrotel@gmail.com" className="contact-link d-flex align-items-center mx-1">
						<FaEnvelope className="me-1" />
						<span style={{ fontSize: "0.8rem" }}>instalacioneselectrotel@gmail.com</span>
					</a>
				</Container>

			</div>

			<Navbar expand="lg" className="bg-body-tertiary">
				<Container fluid>
					<Navbar.Brand href="/">
						<img src="https://res.cloudinary.com/dewanllxn/image/upload/v1745979040/electricista_twxzcz.avif" alt="electricista cerca de ti" className="navbar-logo" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>
							<Nav.Link href="#link" className="nav-link-custom">Contácto</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};
