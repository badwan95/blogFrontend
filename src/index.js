import React from 'react';
import ReactDOM from 'react-dom';
import Authentication from './auth/authContext';

import App from './app';

const Main = props =>{

  return(
    <Authentication>
      <App/>
    </Authentication>
  )
}

ReactDOM.render(<Main/>,document.getElementById('root'));
