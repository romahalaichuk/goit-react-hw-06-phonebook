import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import styles from './App.module.css';

const App = () => {
  const initialContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    if (
      contacts.find(c => c.name.toLowerCase() === contact.name.toLowerCase())
    ) {
      alert('Contact with this name already exists!');
      return;
    }
    setContacts(prevContacts => [
      ...prevContacts,
      { ...contact, id: nanoid() },
    ]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div className={styles.phonebookContainer}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm addContact={addContact} className={styles.formContainer} />

      <h2 className={styles.title}>Contacts</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <ContactList
        contacts={contacts}
        deleteContact={deleteContact}
        filter={filter}
      />
    </div>
  );
};

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};

export default App;
