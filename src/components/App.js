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
    const isContact = this.state.contacts.find(
      el => el.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
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

  changeFilter = e => {
    const filter = e.target.value;
    this.setState({ filter });
  };

  getFiltredList = () =>
    this.state.contacts.filter(el =>
      el.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase()),
    );

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

    return (
      <>
        <Section title={'Phonebook'}>
          <ContactForm onAddContact={this.addContact} />
          {contacts.length >= 2 && (
            <FilterContacts value={filter} onChangeFilter={this.changeFilter} />
          )}
        </Section>
        {contacts.length >= 1 && (
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
