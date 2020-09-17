import React from 'react';
import { NavLink } from 'react-router-dom';
import Signin from '../../auth/signin';
import Signup from '../../auth/signup';

const Header = props =>{



  return(
    <>
      <NavLink to='/'>Go Home</NavLink>
      <Signin/>
      <Signup/>
    </>
  )
}

export default Header;
