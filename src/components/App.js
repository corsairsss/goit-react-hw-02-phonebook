import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Section from './Section/Section.js';
import ContactForm from './ContactForm/ContactForm.js';
import ContactList from './ContactList/ContactList.js';
import FilterContacts from './FilterContacts/FilterContacts.js';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, phone }) => {
    const { contacts } = this.state;
    const isContact = contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );
    if (isContact) {
      alert(`Sorry,but contact ${name}  already exist`);
      return;
    }
    if (!name || !phone) {
      alert('Write NAME and PHONE');
      return;
    }
    const contact = {
      id: uuidv4(),
      name,
      phone,
    };

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  changeFilter = ({ target }) => {
    const filter = target.value;
    this.setState({ filter });
  };

  getFiltredList = () => {
    const { contacts, filter } = this.state;
    const filteredList = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    );
    return filteredList;
  };

  removeContact = e => {
    const key = e.target.dataset.key;
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(el => el.id !== key),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filtredContact = this.getFiltredList();
    const isShowFiltered = contacts.length >= 2;
    const isShowContactsList = contacts.length >= 1;
    return (
      <>
        <Section title={'Phonebook'}>
          <ContactForm onAddContact={this.addContact} />
          {isShowFiltered && (
            <FilterContacts value={filter} onChangeFilter={this.changeFilter} />
          )}
        </Section>
        {isShowContactsList && (
          <Section title={'Contacts:'}>
            <ContactList
              list={filtredContact}
              removeContact={this.removeContact}
            />
          </Section>
        )}
      </>
    );
  }
}
