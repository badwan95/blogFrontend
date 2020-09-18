import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NewBlog from '../components/blog/newBlog';
import { AuthenticationContext } from './authContext';



class Signin extends React.Component{
  static contextType = AuthenticationContext;
  constructor(props) {
    super(props);
    this.state = {showCreate:false};
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password);
  }

  showCreate = value =>{
    this.setState({showCreate:value});
  }

  render(){
    return(
      <>

        

        {this.context.loggedIn && 
          <>
            <NavDropdown title={this.context.user.username} id="basic-nav-dropdown" >
              <NavDropdown.Item ><Button onClick={this.context.logout} variant="danger" >Log Out</Button></NavDropdown.Item>
            </NavDropdown>
            <NewBlog show={this.state.showCreate} token={this.context.token} onHide={() => this.showCreate(false)} /> <Button className="dropDownMenu" variant="primary" onClick={() => this.showCreate(true)}>Create Blog</Button>
          </>
        }

        {!this.context.loggedIn &&
          <>
          <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Log In
              </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <form onSubmit={this.handleSubmit}>

                  <label>Username: </label><input type="text" placeholder="Enter Username" name="username" onChange={this.handleChange} required /><br/>

                  <label>Password</label><input type="password" name="password" placeholder="Enter Password" onChange={this.handleChange} required/><br/>

                  <Button variant="primary" onClick={this.handleSubmit}>Sign In</Button>

                  {this.context.loginErr && <p>Error: {this.context.err.err} </p>}
                </form>
            </Modal.Body>
          </Modal>
          </>
        }

      </>
    )
  }
}

export default Signin;
