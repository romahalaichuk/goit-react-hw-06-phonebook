import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';
import { deleteContact } from '../../redux/phonebookSlice';

const ContactList = () => {
  const [filter, setFilter] = useState('');
  const contacts = useSelector(state => state.phonebook.contacts);
  const dispatch = useDispatch();

  const filteredContacts = filter
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <ul className={styles.listContainer}>
        {filteredContacts.map(contact => (
          <Contact
            key={contact.id.toString()}
            contact={contact}
            deleteContact={handleDeleteContact}
          />
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
