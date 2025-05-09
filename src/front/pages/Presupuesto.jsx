import { useState } from "react";

export const Presupuesto = () => {
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        telefono: "",
        codigoPostal: "",
        mensaje: "",
        imagenes: [],
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 3) {
            setError("Solo puedes subir hasta 3 imágenes.");
        } else {
            setForm((prev) => ({ ...prev, imagenes: files }));
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.nombre) {
            setError("Nombre y email son obligatorios.");
            return;
        }

        const formData = new FormData();
        formData.append("nombre", form.nombre);
        formData.append("email", form.email);
        formData.append("telefono", form.telefono);
        formData.append("codigoPostal", form.codigoPostal);
        formData.append("mensaje", form.mensaje);
        form.imagenes.forEach((img, i) => {
            formData.append(`imagen_${i}`, img);
        });

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/send-budget-request", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Error al enviar el formulario.");

            setSuccess("¡Solicitud de presupuesto enviada correctamente!");
            setForm({ nombre: "", email: "", telefono: "", codigoPostal: "", mensaje: "", imagenes: [] });
        } catch (err) {
            setError("Hubo un problema al enviar el formulario.");
        }
    };

    return (
        <div className="presupuesto-container">
            <h1>Presupuesto Online</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Nombre y apellidos:</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input name="telefono" type="tel" value={form.telefono} onChange={handleChange} />
                </div>
                <div>
                    <label>Código postal:</label>
                    <input name="codigoPostal" value={form.codigoPostal} onChange={handleChange} />
                </div>
                <div>
                    <label>Mensaje:</label>
                    <textarea name="mensaje" value={form.mensaje} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>Adjuntar imágenes (máx. 3):</label>
                    <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};
