import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContacts } from "../context/ContactContext";
import ContactCard from "../components/ContactCard";
import ConfirmModal from "../components/ConfirmModal";

function Contact() {
  const { contacts, loading, error, getContacts, deleteContact } = useContacts();

  // Estado para manejar el modal de confirmación
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Cargamos los contactos al montar la vista
  useEffect(() => {
    getContacts();
  }, []);

  // Cuando el usuario hace click en "Eliminar" en una tarjeta
  function handleDeleteClick(contactId) {
    setContactToDelete(contactId);
    setShowModal(true);
  }

  // Cuando el usuario confirma la eliminación en el modal
  async function handleConfirmDelete() {
    await deleteContact(contactToDelete);
    setShowModal(false);
    setContactToDelete(null);
  }

  // Cuando el usuario cancela
  function handleCancelDelete() {
    setShowModal(false);
    setContactToDelete(null);
  }

  return (
    <div className="contact-list-page">
      <div className="page-header">
        <h1>📋 Mi Lista de Contactos</h1>
        <Link to="/add-contact" className="btn-add">
          + Agregar Contacto
        </Link>
      </div>

      {/* Estado de carga */}
      {loading && <p className="loading-msg">Cargando contactos...</p>}

      {/* Error de API */}
      {error && <p className="error-msg">Error: {error}</p>}

      {/* Lista vacía */}
      {!loading && !error && contacts.length === 0 && (
        <div className="empty-state">
          <p>No tienes contactos aún.</p>
          <Link to="/add-contact">Agrega tu primer contacto</Link>
        </div>
      )}

      {/* Lista de contactos */}
      <div className="contacts-grid">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <ConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default Contact;
