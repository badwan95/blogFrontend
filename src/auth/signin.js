import React from 'react';
import { AuthenticationContext } from './context';

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
    return(
      <>

        {this.context.loggedIn && 
          <button onClick={this.context.logout} >Log Out</button>
        }

        {!this.context.loggedIn &&
          <form onSubmit={this.handleSubmit}>
            <label>Username: </label><input type="text" placeholder="Enter Username" name="username" onChange={this.handleChange} required />
            <label>Password</label><input type="password" name="password" placeholder="Enter Password" onChange={this.handleChange} required/>
          </form>
        }

      </>
    )
  }
}

export default Signin;
