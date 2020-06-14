import React, { Component } from 'react';

import s from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    phone: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAddContact(this.state);
    this.setState({ name: '', phone: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label className={s.form__label}>
          Name:
          <input
            className={s.form__input}
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
          />
        </label>

        <label className={s.form__label}>
          Phone:
          <input
            className={s.form__input}
            type="number"
            value={this.state.phone}
            onChange={this.handleChange}
            name="phone"
          />
        </label>

        <button type="submit" className={s.form__btn}>
          Add Contact
        </button>
      </form>
    );
  }
}