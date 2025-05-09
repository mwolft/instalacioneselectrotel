import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export const Footer = () => (
	<footer className="footer bg-light text-center py-5">
		<div className="footer-content">
			<p className="mb-2" style={{ color: '#144b54' }}>© 2025 Instalaciones Electrotel. Todos los derechos reservados.</p>
			<div className="footer-social">
				<a href="https://wa.me/34614483128" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
					<FaWhatsapp />
				</a>
				<a href="https://www.instagram.com/instalacioneselectrotel" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
					<FaInstagram />
				</a>
				<a href="https://www.facebook.com/profile.php?id=61574918625236" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
					<FaFacebook />
				</a>
			</div>
		</div>
	</footer>
);

