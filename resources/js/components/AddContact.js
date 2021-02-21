import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class AddContact extends Component{
    constructor (props){
        super(props)
        this.state = {  // defining data
            nameError  : '',
            phoneError : '',
            editMode  : false,  // for update
            name  : '',  // for update
            phone : ''  // for update
          };

        this.store = this.store.bind(this) // Binding
        this.update = this.update.bind(this) // Binding on update
    }

    componentDidMount(){
 
        const id=this.props.match.params.id;

        if (id) {
            this.setState({
                editMode: true
            })
            axios.get('/edit/'+id)
             .then(response => {
                this.setState({ 
                    name: response.data.name, 
                    phone: response.data.phone
                });
                console.log(response);
             })
             .catch(error => {
                console.log(error);
             })
        }
    
     }

    store (e) { // store function
        e.preventDefault();
        const { name,phone } = e.target
        const { history } = this.props

        this.setState({
            nameError  : '',
            phoneError : '',
        })

        axios.post('/store', {
            name  : name.value, // name holo id . r id mane getElementById
            phone : phone.value
        })
          .then(response => {
              history.push('/contacts')
          })
          .catch(error => {
            if (error.response.data.errors.name) {
                this.setState({
                    nameError : error.response.data.errors.name[0]
                })
            }
            if (error.response.data.errors.phone) {
                this.setState({
                    phoneError : error.response.data.errors.phone[0]
                })
            }
          })
    }
    update (e) { // update function
        e.preventDefault();
        const { name,phone } = e.target
        const { history } = this.props

        this.setState({
            nameError  : '',
            phoneError : '',
        })
        
        const id=this.props.match.params.id; // update id

        axios.post('/update/'+id, {
            name  : name.value,
            phone : phone.value
        })
          .then(response => {
              history.push('/contacts')
          })
          .catch(error => {
            if (error.response.data.errors.name) {
                this.setState({
                    nameError : error.response.data.errors.name[0]
                })
            }
            if (error.response.data.errors.phone) {
                this.setState({
                    phoneError : error.response.data.errors.phone[0]
                })
            }
          })
    }
    render () {

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">{this.state.editMode == true ? 'Update' : 'Add' } Contact</div>
                            <div className="card-body">
                                
                                <form onSubmit={this.state.editMode == true ? this.update : this.store} className="form-group">

                                    <input id='name' defaultValue={this.state.name} className="form-control mb-2" placeholder="Enter name"/>

                                        <small className="text-danger" id='nameError'>{this.state.nameError}</small>

                                    <input id='phone' defaultValue={this.state.phone} className="form-control mt-2" placeholder="Enter phone number"/>

                                        <small className="text-danger">{this.state.phoneError}</small> <br/>
                                    
                                    <button className="btn btn-success btn-sm mt-2">{this.state.editMode == true ? 'Update' : 'Save' }</button>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default AddContact;

if (document.getElementById('addContact')) {
    ReactDOM.render(<AddContact />, document.getElementById('addContact'));
}