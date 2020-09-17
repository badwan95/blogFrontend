import React from 'react';
import cookie from 'react-cookies';
import superagent from 'superagent';

const API = process.env.REACT_APP_API || 'http://localhost:8080';

export const AuthenticationContext = React.createContext();

class Authentication extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      login: this.login,
      logout: this.logout,
      user: {},
      error: false,
      errMsg:'',
    }
  }

  login = (username,password) =>{
    superagent.post(`${API}/signin`)
    .auth(username,password)
    .then(res=>{
      console.log(res.body);
      this.validateToken(res.body.token)
    })
    .catch(e=>{
      console.log(e.response.body);
      this.setState({error:true,loader:false});
    });
  }

  validateToken = token =>{
    superagent.post(`${API}/verify`)
    .then(userResult =>{
      this.setLoginState(true,token,userResult)
    })
    .catch(e=>{
      this.logout();
      console.log(e.response.body);
      this.setState({error:true,errMsg:e.response.body});
      console.log(this.state);
    })
  }

  setLoginState = (loggedIn, token, user) => {
    cookie.save('blog-user', token);
    this.setState({token, loggedIn, user});
  }

  logout = () => {
    this.setLoginState(false, null, {});
  }
  
  componentDidMount() {
    const cookieToken = cookie.load('gadha-auth');
    const token = cookieToken || null;
    this.validateToken(token);
  }



  render() {
    return (
      <AuthenticationContext.Provider value={this.state}>
        {this.props.children}
      </AuthenticationContext.Provider>
    )
  }
}

export default Authentication;
