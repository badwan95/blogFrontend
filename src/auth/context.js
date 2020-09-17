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
      console.log('hello from login');
    superagent.post(`${API}/signin`)
    .auth(username,password)
    .then(res=>{
      console.log(res.body);
      this.setState({loginErr:false});
      this.setLoginState(true,res.body.token,res.body)
    //   this.validateToken(res.body.token)
    })
    .catch(e=>{
      console.log(e.response.body);
      this.setState({loginErr:true,err:e.response.body});
    });
  }

  validateToken = token =>{
    superagent.post(`${API}/verify`)
    .auth(token, { type: 'bearer' })
    .then(userResult =>{
        console.log('hello');
      this.setLoginState(true,token,userResult.body)
    })
    .catch(e=>{
      this.logout();
      console.log(e.response.body);
      this.setState({error:true,errMsg:e.response.body});
      console.log(this.state);
    })
  }

  setLoginState = (loggedIn, token, user) => {
    cookie.save('blog-user', {token,loggedIn});
    this.setState({token, loggedIn, user});
  }

  logout = () => {
    this.setLoginState(false, null, {});
  }
  
  componentDidMount() {
    const theCookie = cookie.load('blog-user');
    let cookieToken = theCookie.token;
    this.setState({loggedIn:cookie.loggedIn});
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
