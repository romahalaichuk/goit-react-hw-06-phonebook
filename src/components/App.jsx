import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import styles from './App.module.css';

const App = () => {
  const deleteContact = id => {
    console.log('Usuwanie kontaktu o id:', id);
  };

  return (
    <Provider store={store}>
      <div className={styles.phonebookContainer}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm />
        <h2 className={styles.title}>Contacts</h2>
        <ContactList deleteContact={deleteContact} />{' '}
      </div>
    </Provider>
  );
};

export default App;
