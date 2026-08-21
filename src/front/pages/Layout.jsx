import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { MainNavbar } from "../components/MainNavbar";
import { Footer } from "../components/Footer"
import { WhatsAppWidget } from "../components/WhatsAppWidget";

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
	return (
		<>
			<WhatsAppWidget />
			<div className="layout-wrapper">
				<div id="smooth-wrapper">
					<div id="smooth-content">
						<ScrollToTop>
							<MainNavbar />
							<main className="layout-content">
								<Outlet />
							</main>
							<Footer />
						</ScrollToTop>
					</div>
				</div>
			</div>
		</>
	);
};
