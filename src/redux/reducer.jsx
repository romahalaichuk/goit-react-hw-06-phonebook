import { ADD_CONTACT, DELETE_CONTACT } from './actions';

const initialState = {
  contacts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case DELETE_CONTACT:
      if (action.payload) {
        return {
          ...state,
          contacts: state.contacts.filter(
            contact => contact.id !== action.payload
          ),
        };
      } else {
        console.error('Contact ID is undefined!');
        return state;
      }
    default:
      return state;
  }
};

export default rootReducer;
