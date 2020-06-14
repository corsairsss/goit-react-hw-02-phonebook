import React from 'react';

import s from './FilterContacts.module.css';

export default function FilterContacts({ value, onChangeFilter }) {
  return (
    <>
      <p className={s.filterTitle}>Find contacts by name</p>
      <input
        type="text"
        value={value}
        onChange={onChangeFilter}
        className={s.filterInput}
        placeholder="Search..."
      />
    </>
  );
}
