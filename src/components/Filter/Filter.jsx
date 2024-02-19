import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/phonebookSlice';
import styles from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className={styles.filterContainer}>
      <label htmlFor="filter">Filter contacts:</label>
      <input
        type="text"
        id="filter"
        onChange={handleFilterChange}
        className={styles.filterInput}
        placeholder="Search by name or number"
      />
    </div>
  );
};

export default Filter;
