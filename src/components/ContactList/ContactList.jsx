import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Dodajemy useDispatch
import PropTypes from 'prop-types';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';
import { deleteContact } from '../../redux/actions'; // Importujemy akcję deleteContact

const ContactList = () => {
  const [filter, setFilter] = useState('');
  const contacts = useSelector(state => state.phonebook.contacts);
  const dispatch = useDispatch(); // Inicjalizujemy useDispatch

  const filteredContacts = filter
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  const handleChange = e => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id)); // Wywołujemy akcję deleteContact z ID kontaktu jako argument
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={handleChange}
      />
      <ul className={styles.listContainer}>
        {filteredContacts.map(contact => (
          <Contact
            key={contact.id.toString()}
            contact={contact}
            deleteContact={handleDeleteContact} // Przekazujemy funkcję handleDeleteContact do Contact
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
