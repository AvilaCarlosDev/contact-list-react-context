import { useNavigate } from "react-router-dom";

// Muestra la info de un contacto con botones de editar y eliminar
function ContactCard({ contact, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="contact-card">
      {/* Avatar con la primera letra del nombre */}
      <div className="contact-avatar">
        {contact.name ? contact.name.charAt(0).toUpperCase() : "?"}
      </div>

      <div className="contact-info">
        <h3>{contact.name}</h3>

        {contact.phone && (
          <p>
            <span className="label">📞</span> {contact.phone}
          </p>
        )}
        {contact.email && (
          <p>
            <span className="label">✉️</span> {contact.email}
          </p>
        )}
        {contact.address && (
          <p>
            <span className="label">📍</span> {contact.address}
          </p>
        )}
      </div>

      <div className="contact-actions">
        <button
          className="btn-edit"
          onClick={() => navigate(`/edit-contact/${contact.id}`)}
        >
          Editar
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(contact.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ContactCard;
