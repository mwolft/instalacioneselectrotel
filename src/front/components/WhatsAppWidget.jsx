import { useEffect, useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

export const WhatsAppWidget  = () => {
 const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`whatsapp-widget ${collapsed ? "collapsed" : "expanded"}`}>
      {collapsed ? (
        <button className="whatsapp-icon" onClick={() => setCollapsed(false)}>
          <FaWhatsapp size={24} />
        </button>
      ) : (
        <div className="whatsapp-box">
          <div className="whatsapp-header">
            <div className="whatsapp-user">
              <img src="https://res.cloudinary.com/dewanllxn/image/upload/v1746809570/whatsApp-profile_wlwjyg.png" alt="electricista en el puerto de santa maria" />
              <div>
                <strong>Carlos Fernández</strong>
                <p>Normalmente responde en menos de 1h</p>
              </div>
            </div>
            <button className="close-btn" onClick={() => setCollapsed(true)}>
              <FaTimes />
            </button>
          </div>
          <div className="whatsapp-body">
            <div className="message">
              <p>Hola! 👋</p>
              <p>Le puedo ayudar?</p>
              <span className="time">11:07</span>
            </div>
            <a
              href="https://wa.me/34614483128"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
            >
              <FaWhatsapp className="me-2" /> Chat en WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
