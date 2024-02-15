import React from 'react';
import PropTypes from 'prop-types';

const Contact = ({ contact, deleteContact }) => {
  return (
    <li>
      <span>
        {contact.name}: {contact.number}
      </span>
      <button onClick={() => deleteContact(contact.id)}>Delete</button>
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
