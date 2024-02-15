import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Contact from '../Contact/Contact';
import { deleteContact } from '../actions';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

const ContactList = ({ contacts }) => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={styles.listContainer}>
      {filteredContacts.map(contact => (
        <Contact
          key={contact.id}
          contact={contact}
          deleteContact={handleDelete}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default ContactList;
