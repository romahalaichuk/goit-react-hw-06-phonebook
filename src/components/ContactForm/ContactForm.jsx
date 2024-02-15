import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

const ContactForm = ({ addContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContact({ id: nanoid(), ...formData });
    setFormData({
      name: '',
      number: '',
    });
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces."
          required
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
        />
      </label>
      <label>
        Number:
        <input
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={formData.number}
          onChange={handleChange}
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
