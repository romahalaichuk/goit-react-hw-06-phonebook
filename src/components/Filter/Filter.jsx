import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../actions';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <label className={styles.label}>
      Filter contacts:
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        className={styles.filterInput}
      />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default Filter;
