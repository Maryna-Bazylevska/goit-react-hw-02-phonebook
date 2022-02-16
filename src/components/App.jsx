 import React from "react";
 import { nanoid } from "nanoid";
 import ContactForm from './ContactForm';
 import ContactList from "./ContactList";
 import Filter from './Filter';
 import Notification from './Notification';
 import {Wrapper} from './App.styles'
 const INITIAL_STATE = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: ''
};
const filterContacts = (contacts, filter) => {
  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};
 class App extends React.Component  {
  state = {
    ...INITIAL_STATE 
  }
  addContact = (data) => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    this.state.contacts.filter((item) => item.name === data.name).length > 0
      ? alert(`${contact.name} is already in contacts`)
      : this.setState((prevState) => ({
          contacts: [...prevState.contacts, contact],
        }));
  };
  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };
  handleChange =(e)=>{
    
    this.setState({ filter: e.currentTarget.value });
  }
  getVisibleContac = () => {
    const { filter, contacts } = this.state;
    const normalized = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalized)
    );
  };
   render(){
     const {contacts, filter}=this.state;
     const filteredContacts = filterContacts(contacts, filter);
    return (
      <Wrapper>
         <h1>Phonebook</h1>
         <ContactForm onSubmit={this.addContact} />
         {contacts.length < 1 ? (
          <Notification text="Contact list is empty" />
        ) : (
          <div>
         <h2>Contacts</h2>
         <Filter value={filter} onChange={this.handleChange }/>
         <ContactList items={filteredContacts} onDeleteContact={this.deleteContact}/>
         </div>
        )}
      </Wrapper>
    );
   }
  
};
export default App;