import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.scss';

//Components
import Header from './components/header/header';
import Body from './components/body/body';
import BlogPage from './components/blog/blogPage';

const App = props =>{



  return(
    <Router>

    
      <Header/>
      <Route path="/" exact><Body/> </Route>
      <Route path="/test" > testing new route</Route>
      <Route path="/blog/:id" render={({match})=>(
        <BlogPage id={match.params.id} />
      )}/>

    </Router>
  )
}

export default App;
