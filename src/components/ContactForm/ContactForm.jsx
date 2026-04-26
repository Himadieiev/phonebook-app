import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

import { createContactThunk } from 'redux/Contacts/thunks';

import css from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

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

    const existingName = contacts.find(contact => contact.name === name);
    if (existingName) {
      newErrors.name = `${name} is already in contacts`;
    }

    const existingNumber = contacts.find(contact => contact.number === number);
    if (existingNumber) {
      newErrors.number = `${number} is already in contacts`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setName('');
    setNumber('');
    setErrors({});
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        if (errors.name) setErrors({ ...errors, name: '' });
        break;
      case 'number':
        setNumber(value);
        if (errors.number) setErrors({ ...errors, number: '' });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      await dispatch(createContactThunk({ name, number })).unwrap();
      handleReset();
      toast.success('Contact added successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to add contact');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form} noValidate>
      <div className={css.header}>
        <h3 className={css.title}>Add New Contact</h3>
        <Button
          type="button"
          variant="outlined"
          onClick={handleReset}
          className={css.clearBtn}
          disabled={isLoading}
        >
          Clear
        </Button>
      </div>

      <div className={css.field}>
        <label htmlFor="name" className={css.label}>
          Name
        </label>
        <input
          id="name"
          className={`${css.input} ${errors.name ? css.inputError : ''}`}
          type="text"
          value={name}
          onChange={handleChange}
          name="name"
          placeholder="Enter name"
        />
        {errors.name && <span className={css.error}>{errors.name}</span>}
      </div>

      <div className={css.field}>
        <label htmlFor="number" className={css.label}>
          Number
        </label>
        <input
          id="number"
          className={`${css.input} ${errors.number ? css.inputError : ''}`}
          type="tel"
          value={number}
          onChange={handleChange}
          name="number"
          placeholder="Enter phone number"
        />
        {errors.number && <span className={css.error}>{errors.number}</span>}
      </div>

      <Button
        type="submit"
        variant="contained"
        className={css.button}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Add Contact'
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
