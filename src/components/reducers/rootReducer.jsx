import { combineReducers } from 'redux';
import contactsReducer from '../reducers/contactsReducer';
import filterReducer from '../reducers/filterReducer';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

export default rootReducer;
