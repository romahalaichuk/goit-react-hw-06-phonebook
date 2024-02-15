import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from '../actions';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const ContactForm = ({ addContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const dispatch = useDispatch();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addContact({ id: nanoid(), ...formData }));
    setFormData({
      name: '',
      number: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </label>
      <label>
        Number:
        <input
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.button}>
        Add Contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
