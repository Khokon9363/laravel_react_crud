import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Contact extends Component {
    constructor () {
      super()
      this.state = {
        contacts: []
      }
    }
    componentDidMount () {
        this.getContacts();
    }
    getContacts(){
        axios.get('/get_contacts')
           .then(response => {
                this.setState({
                    contacts: response.data
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    destroy(id) {
        axios.get('/destroy/'+id)
            .then(response => {
                alert(response.data);
                this.getContacts()
            })
            .catch(error => {
                console.log(error);
            })
    }

    render () {
      const { contacts } = this.state

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header">Contacts list</div>

                            <div className="card-body">
                                <table className="table text-center table-bordered table-hover">
                                    <tbody>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Number</th>
                                            <th>Action</th>
                                        </tr>
                                    {contacts.map((contact,index) => (
                                        <tr key={contact.id}>
                                            <td>{++index}</td>
                                            <td>{contact.name}</td>
                                            <td>{contact.phone}</td>
                                            <td>
                                                <Link to={'/edit/'+contact.id} className="btn btn-primary btn-sm mr-2">Edit</Link>
                                                <button onClick={(e) => this.destroy(contact.id)} className="btn btn-danger btn-sm ml-2">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Contact;

if (document.getElementById('contact')) {
    ReactDOM.render(<Contact />, document.getElementById('contact'));
}