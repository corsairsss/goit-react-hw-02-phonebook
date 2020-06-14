import React from 'react';

import s from './ContactList.module.css';

export default function ContactList({ list, removeContact }) {
  return (
    <ul className={s.list}>
      {list.map(elem => {
        return (
          <li key={elem.id} className={s.list__item}>
            <span>{elem.name}:</span>
            <a href="tel:+" {...elem.phone}>
              {elem.phone}
            </a>
            <button type="button" onClick={removeContact} data-key={elem.id}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
