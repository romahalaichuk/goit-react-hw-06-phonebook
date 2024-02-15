import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Contact.module.css';

const Contact = ({ contact, deleteContact }) => {
  const handleDelete = useCallback(() => {
    deleteContact(contact.id);
  }, [contact.id, deleteContact]);

  return (
    <li className={styles.contactItem}>
      <span className={styles.contactInfo}>
        {contact.name}: {contact.number}
      </span>
      <button className={styles.deleteButton} onClick={handleDelete}>
        Delete
      </button>
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
