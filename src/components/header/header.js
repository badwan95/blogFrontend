import React from 'react';
import Signin from '../../auth/signin';
import Signup from '../../auth/signup';

const Header = props =>{



  return(
    <>
      <p>This is the header.</p>
      <Signin/>
      <Signup/>
    </>
  )
}

export default Header;
