import React from 'react';
import { Button, Header, Image, Modal, Form, Message } from 'semantic-ui-react';

const AddContactForm = (props) => (
  <Modal open={props.showAddContact} onClose={props.hideAddContact} closeIcon>
    <Modal.Header>Add A Contact</Modal.Header>
    <Modal.Content >
      <Form success id="addContactForm" onSubmit={props.addContact} success={props.success} error={props.error}>
        <Form.Input label='First Name' placeholder='John' name='contactFirstName' />
        <Form.Input label='Last Name' placeholder='Doe' name='contactLastName' />
        <Form.Input label='Description' placeholder='Optional e.g. Client, Friend, Barber..' name='contactDescription' />
        <Form.Input label='Phone Number' placeholder='1-800-444-4444' name='contactPhoneNumber' />
        <Form.Input type='file' label='Profile Picture (Optional)' name='contactProfilePicture' />
        <Message
          success
          header='Success!'
          content="Your new contact has been added!"
        />
        <Message
          error
          header='Whoops!'
          content="One of the fields is wrong!"
        />
        <Button>Submit</Button>
      </Form>
    </Modal.Content>
  </Modal>
)

export default AddContactForm;
