export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT'; // Dodajemy nową akcję DELETE_CONTACT

export const addContact = contact => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const deleteContact = id => ({
  // Definiujemy akcję usuwania kontaktu
  type: DELETE_CONTACT,
  payload: id,
});
