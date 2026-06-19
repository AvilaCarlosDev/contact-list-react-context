import { createContext, useContext, useState } from "react";

// URL base de la API
const BASE_URL = "https://playground.4geeks.com/contact";
// Nombre fijo de nuestra agenda
const AGENDA_SLUG = "carlos-avila-contact-list";

// 1. Creamos el contexto
const ContactContext = createContext();

// 2. Creamos el provider que envuelve toda la app
export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Verificar si la agenda existe, si no, crearla
  async function ensureAgendaExists() {
    try {
      const res = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}`);
      if (res.status === 404) {
        // La agenda no existe, la creamos
        await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}`, {
          method: "POST",
        });
      }
    } catch (err) {
      console.error("Error verificando la agenda:", err);
    }
  }

  // Obtener todos los contactos
  async function getContacts() {
    setLoading(true);
    setError(null);
    try {
      await ensureAgendaExists();
      const res = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`);
      if (!res.ok) throw new Error("Error al obtener contactos");
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (err) {
      setError(err.message);
      console.error("getContacts error:", err);
    } finally {
      setLoading(false);
    }
  }

  // Crear un contacto nuevo
  async function createContact(contactData) {
    try {
      const res = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
      if (!res.ok) throw new Error("Error al crear contacto");
      await getContacts(); // Actualizamos la lista
    } catch (err) {
      setError(err.message);
      console.error("createContact error:", err);
    }
  }

  // Actualizar un contacto existente
  async function updateContact(contactId, contactData) {
    try {
      const res = await fetch(
        `${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        }
      );
      if (!res.ok) throw new Error("Error al actualizar contacto");
      await getContacts(); // Actualizamos la lista
    } catch (err) {
      setError(err.message);
      console.error("updateContact error:", err);
    }
  }

  // Eliminar un contacto
  async function deleteContact(contactId) {
    try {
      const res = await fetch(
        `${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Error al eliminar contacto");
      await getContacts(); // Actualizamos la lista
    } catch (err) {
      setError(err.message);
      console.error("deleteContact error:", err);
    }
  }

  // Obtener un contacto por su ID (busca en el estado local)
  function getContactById(contactId) {
    return contacts.find((c) => c.id === parseInt(contactId)) || null;
  }

  // Lo que exponemos al resto de la app
  const value = {
    contacts,
    loading,
    error,
    getContacts,
    createContact,
    updateContact,
    deleteContact,
    getContactById,
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
}

// 3. Hook personalizado para usar el contexto fácilmente
export function useContacts() {
  return useContext(ContactContext);
}
