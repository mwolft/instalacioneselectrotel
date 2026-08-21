import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/img/electricista-1.png";

export const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navBaseStyle = {
    textShadow: '0 0 2px rgba(0,0,0,0.4)',
  };

  const navStyle = isOpen
    ? { ...navBaseStyle, mixBlendMode: 'normal', color: 'black', backgroundColor: 'rgba(255, 255, 255, 0.95)' }
    : { ...navBaseStyle, mixBlendMode: 'difference', color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.01)' };

  const logoStyle = isOpen
    ? { mixBlendMode: 'normal', filter: 'none' }
    : { mixBlendMode: 'difference', filter: 'invert(1)' };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-6 z-60" style={navStyle}>
        <a className="nav-logo" href="/">
          <img src={logo} alt="Logo Electrocel" className="h-8" style={logoStyle} />
        </a>

        <ul
          className={`gap-8 left-0 md:bg-transparent md:static md:flex md:flex-row md:items-center md:gap-8 md:w-auto md:ml-auto transition-all duration-200 z-20 ${isOpen ? "flex flex-col absolute top-full w-full bg-white/95 p-4" : "hidden md:flex"
            }`}
          style={isOpen ? { mixBlendMode: 'normal', filter: 'none' } : { mixBlendMode: 'inherit' }}
        >
          <li>
            <a href="/servicios" className="inline-block px-2 py-1">Servicios</a>
          </li>
          <li>
            <a href="/presupuesto" className="inline-block px-2 py-1">Presupuesto</a>
          </li>
          <li>
            <a href="#contacto" className="inline-block px-2 py-1">Contacto</a>
          </li>
        </ul>

        <button
          className="block md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};
