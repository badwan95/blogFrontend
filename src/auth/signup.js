import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { AuthenticationContext } from './authContext';

class Signup extends React.Component{
  static contextType = AuthenticationContext;
  constructor(props) {
    super(props);
    this.state = {
      role:'writer',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.context.signup(this.state.username, this.state.password, this.state.role);
  }

  render(){
    return(
      <>

        {!this.context.loggedIn &&
          <>

            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Signup
                </Modal.Title>
              </Modal.Header>
              <Modal.Body >
              <form onSubmit={this.handleSubmit} >
                <label>Username: </label>
                <input name="username" type="text" placeholder="Enter your username" required onChange={this.handleChange}/><br/>

                <label>Password: </label>
                <input name="password" type="password" placeholder="Enter your password" required onChange={this.handleChange} /><br/>
                
                <label>User Type: </label> <select name="role" onChange={this.handleChange}>
                  <option value="writer" >Writer</option>
                  <option value="admin" >Admin</option>
                </select><br/>

                <Button variant="primary" onClick={this.handleSubmit}>Sign Up</Button>

                {this.context.signupErr && <p>Error: {this.context.err}</p>}
              </form>
              </Modal.Body>
            </Modal>


            
          </>
        }
      </>
    )
  }
}

export default Signup;

/*
            <form onSubmit={this.handleSubmit} >
              <label>Username: </label>
              <input name="username" type="text" placeholder="Enter your username" required onChange={this.handleChange}/>

              <label>Password: </label>
              <input name="password" type="password" placeholder="Enter your password" required onChange={this.handleChange} />
              
              <select name="role" onChange={this.handleChange}>
                <option value="writer" >Writer</option>
                <option value="admin" >Admin</option>
              </select>

              <button>Sign up</button>

              {this.context.signupErr && <p>Error: {this.context.err}</p>}
            </form>
*/