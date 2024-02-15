import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ filter, setFilter }) => {
  return (
    <label>
      Filter contacts:
      <input
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className={styles.filterInput}
      />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
