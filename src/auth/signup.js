import React from 'react';
import { AuthenticationContext } from './authContext';

class Signup extends React.Component{
  static contextType = AuthenticationContext;
  constructor(props) {
    super(props);
    this.state = {
      role:'writer',
      showForm:false,
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
            <button onClick={e=>{this.setState({showForm:!this.state.showForm})}} >Sign up form</button>
            {this.state.showForm && 
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
            }
          </>
        }
      </>
    )
  }
}

export default Signup;
