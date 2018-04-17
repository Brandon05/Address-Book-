const INITIAL_STATE = {
  contacts:[],
  contact:null,
  isFetching: false,
  error: null,
  successMsg:null,
  showDeleteModal: false,
  contactToDelete: null,
  showEditModal: false,
  contactToEdit: null,
}

const contactReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_CONTACTS_REQUEST':
          return {
            ...currentState,
            contacts:[],
            contact:null,
            isFetching: true,
            error: null,
            successMsg:null,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: false,
            contactToEdit: null,
          }

    case 'FETCH_CONTACTS_SUCCESS':
          return {
            ...currentState,
            contacts:action.contacts,
            contact:null,
            isFetching: false,
            error: null,
            successMsg:action.message,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: false,
            contactToEdit: null,
          }

    case 'FETCH_CONTACTS_FAILURE':
          return {
            ...currentState,
            contacts:[],
            contact:null,
            isFetching: false,
            error: action.error,
            successMsg: null,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: false,
            contactToEdit: null,
          }
    case 'FETCH_CONTACT_REQUEST':
          return {
            ...currentState,
            contacts:currentState.contacts,
            contact: null,
            isFetching: true,
            error: null,
            successMsg: null,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: false,
            contactToEdit: null,
          }
    case 'FETCH_CONTACT_SUCCESS':
          return {
            ...currentState,
            contacts:currentState.contacts,
            contact:action.contact,
            isFetching: false,
            error: null,
            successMsg: action.message,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: false,
            contactToEdit: null,
          }
    case 'FETCH_CONTACT_FAILURE':
          return {
            ...currentState,
            contacts:[],
            contact: null,
            isFetching: false,
            error: action.error,
            successMsg: null,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: false,
            contactToEdit: null,
          }
    case 'ADD_CONTACT_REQUEST':
          return {
            ...currentState,
            contacts:currentState.contacts,
            contact: null,
            isFetching: true,
            error: null,
            successMsg: null,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: false,
            contactToEdit: null,
            newContact: action.contact
          }
    case 'ADD_CONTACT_SUCCESS':
          return {
            ...currentState,
            contacts: [...currentState.contacts, action.contact],
            contact:action.contact,
            isFetching: false,
            error: null,
            successMsg: action.message,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: false,
            showSuccessMessage: true,
            contactToEdit: null,
            newContact: action.contact
          }
    case 'ADD_CONTACT_FAILURE':
          return {
            ...currentState,
            contacts:[],
            contact: null,
            isFetching: false,
            error: action.error,
            successMsg: null,
            showErrorMessage: true,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: false,
            contactToEdit: null,
            newContact: null
          }
    case 'HIDE_ADD_CONTACT_FORM':
          return {
            ...currentState,
            contacts:currentState.contacts,
            contact:null,
            isFetching: false,
            error: null,
            successMsg:null,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: false,
            contactToEdit: null,
            newTodo: null
          }
    case 'SHOW_EDIT_CONTACT_FORM':
          return {
            ...currentState,
            contacts:currentState.contacts,
            contact:null,
            isFetching: false,
            error: null,
            successMsg:null,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: true,
            contactToEdit: action.contact,
            newTodo: null,
            showSuccessMessage: false,
            showErrorMessage: false
          }
    case 'HIDE_EDIT_CONTACT_FORM':
          return {
            ...currentState,
            contacts:currentState.contacts,
            contact:null,
            isFetching: false,
            error: null,
            successMsg:null,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: false,
            contactToEdit: null,
            newTodo: null,
            showSuccessMessage: false,
            showErrorMessage: false
          }
    case 'EDIT_CONTACT_REQUEST':
          return {
            ...currentState,
            contacts:currentState.contacts,
            contact:null,
            isFetching: true,
            error: null,
            successMsg:null,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: true,
            contactToEdit: action.contact,
            newTodo: null,
            showSuccessMessage: false,
            showErrorMessage: false
          }
    case 'EDIT_CONTACT_SUCCESS':
          const updatedContacts = currentState.contacts.map((contact) => {
           if(contact.id !== action.contact.id){
             //This is not the item we care about, keep it as is
             return contact;
           }
           //Otherwise, this is the one we want to return an updated value
           return { ...contact, ...action.contact }
         })
          return {
            ...currentState,
            contacts:updatedContacts,
            contact:null,
            isFetching: false,
            error: null,
            successMsg:action.message,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: true,
            contactToEdit: action.contact,
            newTodo: null,
            showSuccessMessage: true,
            showErrorMessage: false
          }
      case 'EDIT_CONTACT_FAILURE':
          return {
            ...currentState,
            contacts:currentState.contacts,
            contact:null,
            isFetching: false,
            error: action.error,
            successMsg:null,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: true,
            contactToEdit: currentState.contactToEdit,
            newTodo: null,
            showSuccessMessage: false,
            showErrorMessage: true
          }
      case 'SHOW_DELETE_MODAL':
          return {
            ...currentState,
            contacts:currentState.contacts,
            contact:null,
            isFetching: false,
            error: null,
            successMsg:null,
            showDeleteModal: true,
            contactToDelete: action.contact,
            showEditModal: false,
            contactToEdit: null,
            newTodo: null,
            showSuccessMessage: false,
            showErrorMessage: false
          }
      case 'HIDE_DELETE_MODAL':
          return {
            ...currentState,
            contacts:currentState.contacts,
            contact:null,
            isFetching: false,
            error: null,
            successMsg:null,
            showDeleteModal: false,
            contactToDelete: null,
            showEditModal: false,
            contactToEdit: null,
            newTodo: null,
            showSuccessMessage: false,
            showErrorMessage: false
          }
      case 'DELETE_CONTACT_REQUEST':
          return {
            ...currentState,
            contacts:currentState.contacts,
            contact:null,
            isFetching: false,
            error: null,
            successMsg:null,
            showDeleteModal: true,
            contactToDelete: action.contact,
            showEditModal: false,
            contactToEdit: null,
            newTodo: null,
            showSuccessMessage: false,
            showErrorMessage: false
          }
      case 'DELETE_CONTACT_SUCCESS':
          const filteredContacts = currentState.contacts.filter((contact) => contact.id !== currentState.contactToDelete.id)
          return {
            ...currentState,
            contacts:filteredContacts,
            contact:null,
            isFetching: false,
            error: null,
            successMsg:null,
            showDeleteModal: false,
            contactToDelete: action.contact,
            showEditModal: false,
            contactToEdit: null,
            newTodo: null,
            showSuccessMessage: false,
            showErrorMessage: false
          }
      case 'DELETE_CONTACT_FAILURE':
          return {
            ...currentState,
            contacts:currentState.contacts,
            contact:null,
            isFetching: false,
            error: null,
            successMsg:null,
            showDeleteModal: true,
            contactToDelete: action.contact,
            showEditModal: false,
            contactToEdit: null,
            newTodo: null,
            showSuccessMessage: false,
            showErrorMessage: true
          }
    default:
          return currentState;
  }
}

export default contactReducer;
