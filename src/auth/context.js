import React from 'react';
import cookie from 'react-cookies';
import superagent from 'superagent';

const API = process.env.REACT_APP_API || 'http://localhost:3000/';

export const LoginContext = React.createContext();

class Authentication extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  



  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    )
  }
}

export default Authentication;
