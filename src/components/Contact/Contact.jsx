import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contact.module.css';

const Contact = ({ contact, deleteContact }) => {
  const { id, name, number } = contact;

  const handleDelete = () => {
    console.log('Deleting contact with id:', id);
    deleteContact(id); // Wywołujemy funkcję deleteContact z ID kontaktu jako argument
  };

  return (
    <li className={styles.contactItem}>
      <span className={styles.contactInfo}>
        {name}: {number}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Contact;
