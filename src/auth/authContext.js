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
      signup: this.signup,
      user: {},
      loginErr: false,
      signupErr:false,
      errMsg:'',
    }
  }

  login = (username,password) =>{
    superagent.post(`${API}/signin`)
    .auth(username,password)
    .then(res=>{
      console.log(res.body);
      this.setState({loginErr:false});
      
      this.setLoginState(true,res.body.token,res.body)
    })
    .catch(e=>{
      console.log(e.response.body);
      window.alert(e.response.body.err)
      this.setState({loginErr:true,err:e.response.body});
    });
  }

  signup = (username,password,role) =>{
    let newUser = {username,password,role}
    superagent.post(`${API}/signup`)
    .send(newUser)
    .then(res=>{
      this.login(username,password);
    })
    .catch((e)=>{
      console.log(e.response.body);
      this.setState({signupErr:true,err:'Try using a different username'});
    })
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
      this.setState({err:'error'});
    })
  }

  setLoginState = (loggedIn, token, user) => {
    cookie.save('blog-user', token,loggedIn);
    this.setState({token, loggedIn, user});
  }

  logout = () => {
    this.setLoginState(false, null, {});
  }
  
  componentDidMount() {
    const cookieToken = cookie.load('blog-user');
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
