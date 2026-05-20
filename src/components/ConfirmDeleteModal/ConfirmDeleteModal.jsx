import { useEffect } from 'react';
import { Button } from '@mui/material';

import css from './ConfirmDeleteModal.module.css';

const ConfirmDeleteModal = ({ open, onClose, onConfirm, contactName }) => {
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <div className={css.header}>
          <h2 className={css.title}>Confirm Deletion</h2>
          <button className={css.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={css.content}>
          <p className={css.message}>
            Are you sure you want to delete contact{' '}
            <strong>"{contactName}"</strong>?
          </p>
          <p className={css.warning}>This action cannot be undone.</p>
        </div>

        <div className={css.actions}>
          <Button
            type="button"
            variant="outlined"
            onClick={onClose}
            className={css.cancelBtn}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={onConfirm}
            className={css.deleteBtn}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
