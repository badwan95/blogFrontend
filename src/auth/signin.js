import React from 'react';
import { AuthenticationContext } from './authContext';

class Signin extends React.Component{
  static contextType = AuthenticationContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password);
  }

  render(){
    console.log(this.context);
    return(
      <>

        {this.context.loggedIn && 
          <button onClick={this.context.logout} >Log Out</button>
        }

        {!this.context.loggedIn &&
          <form onSubmit={this.handleSubmit}>

            <label>Username: </label><input type="text" placeholder="Enter Username" name="username" onChange={this.handleChange} required />

            <label>Password</label><input type="password" name="password" placeholder="Enter Password" onChange={this.handleChange} required/>

            <button>Sign In</button>

            {this.context.loginErr && <p>Error: {this.context.err.err} </p>}
          </form>
        }

      </>
    )
  }
}

export default Signin;
