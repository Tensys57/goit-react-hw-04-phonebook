import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const LOCAL_STORAGE_CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const prevContacts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY)
    );
    if (prevContacts) {
      setContacts(prevContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = contact => {
    if (contacts.find(item => item.name === contact.name)) {
      return alert(`${contact.name} is already in contacts`);
    }
    setContacts(prevState => [...prevState, contact]);
  };

  const changeFilter = ev => {
    setFilter(ev.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactID => {
    setContacts(contacts.filter(contact => contact.id !== contactID));
  };

  return (
    <div className={css.container}>
      <p className={css.main}>Phonebook</p>
      <ContactForm onSubmitContact={handleFormSubmit} />
      <p className={css.title}>Contacts</p>
      <Filter value={filter} onChange={changeFilter} />
      <Contacts
        contacts={getFilteredContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
