import { nanoid } from 'nanoid';
import { useState } from 'react';

import css from './ContactForm.module.css';

export const ContactForm = ({ onSubmitContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ev => {
    const { name, value } = ev.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log('Failed value...');
    }
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    onSubmitContact(newContact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <form className={css.inputForm} onSubmit={handleSubmit}>
        <label className={css.inputLabel}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
          />
        </label>
        <label className={css.inputLabel}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={css.inputBtn}>
          Add contact
        </button>
      </form>
    </div>
  );
};
