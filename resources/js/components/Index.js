import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Contact from './Contact';
import AddContact from './AddContact';

function Index() {
    return (
        <Router>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-11">
                        <div className="card">
                            <div className="card-header">
                                <div className="float-left">
                                    <Link to="/contacts" className="btn btn-primary btn-sm">Contacts</Link>
                                </div>
                                <div className="float-right">
                                    <Link to="/add-contact" className="btn btn-primary btn-sm">Add Contact</Link>
                                </div>
                            </div>
                            <div className="card-body">
                            <Switch>
                                <Route path="/contacts" component={Contact}/>
                                <Route path="/add-contact" component={AddContact}/>
                                <Route path="/edit/:id" component={AddContact}/>
                            </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}