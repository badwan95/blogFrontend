import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import {AuthenticationContext} from '../../auth/authContext';
import Signin from '../../auth/signin';
import Signup from '../../auth/signup';

const Header = props =>{
  let context = useContext(AuthenticationContext);


  return(
    <>
      <NavLink to='/'>Home</NavLink>
      {context.user.userRole === 'admin' && 
      <NavLink to='/admin'>Admin Dashboard</NavLink>
      }
      <Signin/>
      <Signup/>
    </>
  )
}

export default Header;
