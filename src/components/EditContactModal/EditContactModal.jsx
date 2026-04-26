import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

import { updateContactThunk } from 'redux/Contacts/thunks';

import css from './EditContactModal.module.css';

const EditContactModal = ({ contact, onClose, onUpdate }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setNumber(contact.number);
    }
  }, [contact]);

  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (name.length > 30) {
      newErrors.name = 'Name must be less than 30 characters';
    } else if (!/^[a-zA-Zа-яА-Я\s\-']+$/.test(name)) {
      newErrors.name = 'Name contains invalid characters';
    }

    const cleanNumber = number.replace(/[\s\-()+]/g, '');

    if (!number.trim()) {
      newErrors.number = 'Number is required';
    } else if (cleanNumber.length < 7) {
      newErrors.number = 'Number must be at least 7 digits';
    } else if (cleanNumber.length > 15) {
      newErrors.number = 'Number must be less than 15 digits';
    } else if (!/^[0-9\-+\s()]+$/.test(number)) {
      newErrors.number = 'Number contains invalid characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      await dispatch(
        updateContactThunk({ contactId: contact._id, data: { name, number } })
      ).unwrap();
      toast.success('Contact updated successfully');
      onUpdate();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update contact');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <div className={css.header}>
          <h2 className={css.title}>Edit Contact</h2>
          <button className={css.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.field}>
            <label htmlFor="edit-name" className={css.label}>
              Name
            </label>
            <input
              id="edit-name"
              className={`${css.input} ${errors.name ? css.inputError : ''}`}
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter name"
            />
            {errors.name && <span className={css.error}>{errors.name}</span>}
          </div>

          <div className={css.field}>
            <label htmlFor="edit-number" className={css.label}>
              Number
            </label>
            <input
              id="edit-number"
              className={`${css.input} ${errors.number ? css.inputError : ''}`}
              type="tel"
              value={number}
              onChange={e => setNumber(e.target.value)}
              placeholder="Enter phone number"
            />
            {errors.number && (
              <span className={css.error}>{errors.number}</span>
            )}
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
              type="submit"
              variant="contained"
              className={css.saveBtn}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactModal;
