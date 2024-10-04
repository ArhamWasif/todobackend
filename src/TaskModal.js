import React from 'react';

function TaskModal({ title, description, onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Task Details</h2>
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Description:</strong> {description}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-btn">Add Task</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
