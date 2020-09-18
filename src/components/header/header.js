import React, {useContext,useState} from 'react';
//Bootstrap Components
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { NavLink } from 'react-router-dom';
import {AuthenticationContext} from '../../auth/authContext';
import Signin from '../../auth/signin';
import Signup from '../../auth/signup';

const Header = props =>{
  let context = useContext(AuthenticationContext);
  const [signinModalShow, setSigninModalShow] = useState(false);
  const [signupModalShow, setSignupModalShow] = useState(false);

  return(
    <>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={NavLink} to="/">Blog-Editor</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/">Homepage</Nav.Link>
            {context.user.userRole === 'admin' && 
              <Nav.Link as={NavLink} to="/admin">Admin Dashboard</Nav.Link>
            }
          </Nav>
          <Nav>
            {context.loggedIn && <Navbar.Text >Welcome</Navbar.Text> }
            <Signin show={signinModalShow} onHide={() => setSigninModalShow(false)} />
            {!context.loggedIn && <Button className="navbarButton"  variant="primary" onClick={() => setSigninModalShow(true)}>Sign in</Button>}
            <Signup show={signupModalShow} onHide={() => setSignupModalShow(false)}/>
            {!context.loggedIn && <Button className="dropDownMenu" variant="primary" onClick={() => setSignupModalShow(true)}>Sign up</Button>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header;
