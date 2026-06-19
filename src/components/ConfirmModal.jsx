// Modal de confirmación antes de eliminar un contacto
function ConfirmModal({ onConfirm, onCancel }) {
  return (
    // Fondo oscuro detrás del modal
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>¿Eliminar contacto?</h3>
        <p>Esta acción no se puede deshacer. ¿Estás seguro?</p>
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-confirm-delete" onClick={onConfirm}>
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
