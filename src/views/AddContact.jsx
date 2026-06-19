import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContacts } from "../context/ContactContext";

function AddContact() {
  const navigate = useNavigate();
  const { id } = useParams(); // Si viene un ID, estamos editando
  const { createContact, updateContact, getContactById, getContacts, contacts } = useContacts();

  // Estado del formulario
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [formError, setFormError] = useState("");
  const isEditing = Boolean(id); // true si hay ID en la URL

  // Si estamos editando, cargar los datos del contacto
  useEffect(() => {
    if (isEditing) {
      // Si aún no tenemos contactos cargados, los traemos
      if (contacts.length === 0) {
        getContacts();
      }
    }
  }, []);

  // Cuando los contactos se cargan, rellenamos el formulario
  useEffect(() => {
    if (isEditing && contacts.length > 0) {
      const contact = getContactById(id);
      if (contact) {
        setForm({
          name: contact.name || "",
          phone: contact.phone || "",
          email: contact.email || "",
          address: contact.address || "",
        });
      }
    }
  }, [contacts, id]);

  // Actualiza el campo del formulario que cambia
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Envía el formulario
  async function handleSubmit(e) {
    e.preventDefault();

    // Validación básica
    if (!form.name.trim()) {
      setFormError("El nombre es obligatorio.");
      return;
    }

    setFormError("");

    const contactData = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
    };

    if (isEditing) {
      await updateContact(id, contactData);
    } else {
      await createContact(contactData);
    }

    // Redirigimos al inicio después de guardar
    navigate("/");
  }

  return (
    <div className="add-contact-page">
      <div className="form-container">
        <h2>{isEditing ? "✏️ Editar Contacto" : "➕ Nuevo Contacto"}</h2>

        {formError && <p className="form-error">{formError}</p>}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nombre *</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              type="text"
              name="phone"
              placeholder="+58 412 000 0000"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Ciudad, País"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-back" onClick={() => navigate("/")}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              {isEditing ? "Guardar cambios" : "Crear contacto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContact;
