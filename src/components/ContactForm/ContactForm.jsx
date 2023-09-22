import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

import css from './ContactForm.module.css';
import { createContactsThunk } from 'redux/Contacts/thunks';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumder] = useState('');
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumder(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    for (let i = 0; i < contacts.length; i++) {
      const element = contacts[i];

      if (element.name === name) {
        toast.error(`${name} is already in contacts.`);
        return;
      }

      if (element.number === number) {
        toast.error(`${number} is already in contacts.`);
        return;
      }
    }
    dispatch(createContactsThunk({ name, number }));
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumder('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <br />
        <input
          className={css.input}
          type="text"
          value={name}
          onChange={handleInputChange}
          name="name"
          pattern="^[a-zA-Zа-яА-Я\s\-']+$"
          required
          placeholder="Enter name"
        />
      </label>
      <label className={css.label}>
        <br />
        Number
        <br />
        <input
          className={css.input}
          type="tel"
          value={number}
          onChange={handleInputChange}
          name="number"
          pattern="^[0-9\-]+$"
          required
          placeholder="Enter phone number"
        />
      </label>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={css.button}
      >
        Add Contact
      </Button>
    </form>
  );
}
