import React from 'react';
import { Header, Icon, Button, Modal } from 'semantic-ui-react';
import AddContactForm from './AddContactForm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAddContact = this.toggleAddContact.bind(this);
    this.addContact = this.addContact.bind(this);
    this.hideAddContactForm = this.hideAddContactForm.bind(this);
  }

  toggleAddContact(event) {
    event.preventDefault();
    this.props.mappedToggleAddContact();
    console.log(this.props.mappedAppState.showAddContact)

  }

  addContact(event) {
    event.preventDefault();
    const form = document.getElementById('addContactForm')
    if(form.contactFirstName.value !== ""  && form.contactLastName.value !== "" && form.contactPhoneNumber.value !== ""){
      const data = new FormData();
      data.append('first_name', form.contactFirstName.value);
      data.append('phone_number', form.contactPhoneNumber.value);
      data.append('last_name', form.contactLastName.value);
      data.append('image', form.contactProfilePicture.files[0]);
      this.props.mappedAddContact(data);
      this.props.mappedShowSuccessMessage();
    }
    else {
      this.props.mappedShowErrorMessage();
      return ;
    }
  }

// not using
  hideAddContactForm() {
    this.props.mappedHideAddContactForm();
  }

  render() {
    const appState = this.props.mappedAppState;
    const addContactButton = <Button fluid color='green' style={{borderRadius: 0}} onClick={this.toggleAddContact}>Add a Contact</Button>
    console.log(appState.showAddContact)
    return(
      <div>
        <Header as='h1' size='huge' icon textAlign='center' style={{marginTop: 15}} >
          <Icon name='users' circular size='mini' />
          <Header.Content>
            Contacts
          </Header.Content>
        </Header>
        <div>
          <Button fluid color='green' style={{borderRadius: 0}} onClick={this.toggleAddContact}>Add a Contact</Button>
        </div>
        <div className="container">
          <AddContactForm showAddContact={appState.showAddContact} hideAddContact={this.toggleAddContact} addContact={this.addContact} success={appState.showSuccessMessage} error={appState.showErrorMessage} />
          { /* Each Smaller Components */}
            {this.props.children}
        </div>
      </div>
    )
  }
}
