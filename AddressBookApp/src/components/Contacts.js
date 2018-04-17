import React from 'react';
import { Header, Image, Table, Button, Icon, Confirm } from 'semantic-ui-react'
import { Link } from 'react-router';
import EditContactForm from './EditContactForm';

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.editContact = this.editContact.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  componentWillMount() {
    this.props.fetchContacts();
  }

  editContact(event) {
    event.preventDefault();
    const form = document.getElementById('editContactForm');
    if(form.contactFirstName.value !== ""  && form.contactLastName.value !== "" && form.contactPhoneNumber.value !== ""){
      const data = new FormData();
      data.append('first_name', form.contactFirstName.value);
      data.append('phone_number', form.contactPhoneNumber.value);
      data.append('last_name', form.contactLastName.value);

      if(form.contactProfilePicture.files[0]) {
        data.append('image', form.contactProfilePicture.files[0]);
      } else {
        data.append('image', this.props.mappedContactState.contactToEdit.image);
      }

      data.append('id', form.contactId.value)
      this.props.mappedEditContact(data);
    }
    else {
      return ;
    }
  }

  deleteContact() {
    this.props.mappedDeleteContact(this.props.mappedContactState.contactToDelete);
  }

  showEditModal(contactToEdit) {
    this.props.mappedShowEditModal(contactToEdit);
  }

  hideEditModal() {
    this.props.mappedHideEditModal();
  }

  hideDeleteModal() {
    this.props.mappedHideDeleteModal();
  }

  showDeleteModal(contactToDelete) {
    this.props.mappedShowDeleteModal(contactToDelete);
  }

  render() {
    const contactState = this.props.mappedContactState;
    const contacts = contactState.contacts;
    const contactToEdit = contactState.contactToEdit;
    return (
      <div className="col-md-12" width="100%" >
        {!contacts && contactState.isFetching &&
          <p>Loading contacts....</p>
        }
        {contacts.length <= 0 && !contactState.isFetching &&
        <div className="wrapper">
          <p style={{textAlign: 'center', marginTop: 20, fontSize: '60px', color: 'grey'}}>No Contacts Available. Add A Contact!</p>
        </div>
        }
        {!contacts && contactState.error &&
          <p style={{textAlign: 'center', marginTop: 20, fontSize: '60px', color: 'red'}}>`Error fetching contacts :( ${contacts}`</p>
        }
        {contacts && contacts.length > 0 && !contactState.isFetching &&
        <Table basic='very' padded='very' style={{marginTop: 50, paddingLeft: 30, paddingRight: 30}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Contact</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
            <Table.HeaderCell>View</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {contacts.map((contact) => <Table.Row key={contact.id}>
          <Table.Cell width='6'>
            <Header as='h2' image>
              {contact.image &&
                <Image src={`http://localhost:3001/${contact.image}`} rounded size='massive' />
              }
              {!contact.image &&
                <Icon name="user" size='mini' style={{marginRight: 50}}/>
              }
              <Header.Content>
                  {contact.first_name}
                  <Header.Subheader>{contact.last_name}</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            <Header as='h2' image>
              <Icon name="phone" />
              <Header.Content>
                  {contact.phone_number}
                  <Header.Subheader>Work Phone</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell className="textCenter"><Button icon onClick={() => this.showEditModal(contact)} size="small"><Icon name="pencil" /></Button></Table.Cell>
           <Table.Cell className="textCenter"><Button icon onClick={() => this.showDeleteModal(contact)} size="small"><Icon name="trash" /></Button></Table.Cell>
           <Table.Cell className="textCenter"><Link to={`/${contact.id}`}>View Details</Link> </Table.Cell>
           </Table.Row> )
        }
        </Table.Body>
        </Table>
        }
        {contactState.showEditModal &&
          <EditContactForm
            contactToEdit={contactState.contactToEdit}
            showEditModal={contactState.showEditModal}
            hideEditModal={this.hideEditModal}
            editContact={this.editContact}
            success={contactState.showSuccessMessage}
            error={contactState.showErrorMessage}
          />
        }
        {contactState.showDeleteModal &&
        <Confirm
          open={contactState.showDeleteModal}
          cancelButton='Never mind'
          confirmButton="Yes delete contact"
          onCancel={this.hideDeleteModal}
          onConfirm={this.deleteContact}
        />

        }
      </div>
    )
  }
}
