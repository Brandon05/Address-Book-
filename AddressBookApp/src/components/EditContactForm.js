import React from 'react';
import { Button, Header, Image, Modal, Form, Message } from 'semantic-ui-react';

const EditContactForm = (props) => (
  <Modal open={props.showEditModal} onClose={props.hideEditModal} closeIcon>
    <Modal.Header>Edit A Contact</Modal.Header>
    <Modal.Content >
      <Form success id="editContactForm" onSubmit={props.editContact} success={props.success} error={props.error}>
        <Form.Input type='hidden' name='contactId' value={props.contactToEdit.id} />
        <Form.Input label='First Name' defaultValue={props.contactToEdit.first_name} name='contactFirstName' />
        <Form.Input label='Last Name' defaultValue={props.contactToEdit.last_name} name='contactLastName' />
        <Form.Input label='Description' defaultValue={props.contactToEdit.description} name='contactDescription' />
        <Form.Input label='Phone Number' defaultValue={props.contactToEdit.phone_number} name='contactPhoneNumber' />
        <Form.Input type='file' label='Profile Picture (Optional)' name='contactProfilePicture' />
        <Message
          success
          header='Success!'
          content="Your contact has been edited!"
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

export default EditContactForm;
