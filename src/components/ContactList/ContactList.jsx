import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Contact from '../Contact/Contact';
import Filter from '../Filter/Filter';
import styles from './ContactList.module.css';
import { deleteContact } from '../../redux/phonebookSlice';

const ContactList = () => {
  const filter = useSelector(state => state.phonebook.filter);
  const contacts = useSelector(state => state.phonebook.contacts);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <Filter />
      <ul className={styles.listContainer}>
        {filteredContacts.map(contact => (
          <Contact
            key={contact.id ? contact.id.toString() : contact.name}
            contact={contact}
            deleteContact={() => handleDeleteContact(contact.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
