import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/phonebookSlice';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const id = Date.now().toString();
    dispatch(addContact({ id, name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <label htmlFor="number">Number:</label>
      <input
        type="text"
        id="number"
        name="number"
        value={number}
        onChange={e => setNumber(e.target.value)}
        required
      />
      <button className={styles.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
