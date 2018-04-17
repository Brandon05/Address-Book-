import React from 'react';

export default class Contact extends React.Component {
  componentDidMount(){
    this.props.mappedFetchContactById(this.props.params.id);
  }

  render() {
    const contactState = this.props.mappedContactState;
    return(
      <div className="contactDetails">
        <h2> Contact Detail</h2>
        {!contactState.contact && contactState.isFetching &&
         <div>
           <p>Loading contact....</p>
         </div>
        }
        {contactState.contact && !contactState.isFetching &&
        <div>
         <h3>{contactState.contact.first_name}</h3>
         <p>{contactState.contact.last_name}</p>
        </div>
       }
      </div>

    )
  }
}
