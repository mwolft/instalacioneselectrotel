import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { MainNavbar } from "../components/MainNavbar";
import { Footer } from "../components/Footer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
	return (
		<div className="layout-wrapper">
			<ScrollToTop>
				<MainNavbar />
				<main className="layout-content">
					<Outlet />
				</main>
				<Footer />
			</ScrollToTop>
		</div>
	);
};
