import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.scss';

//Components
import Header from './components/header/header';
import Body from './components/body/body';
import BlogPage from './components/blog/blogPage';
import NotFound from './components/notFound/notFound';

const App = props => {



  return (
    <Router>


      <Header />
      <Switch>


        <Route path="/" exact><Body /> </Route>
        <Route path="/blog/:id" render={({ match }) => (
          <BlogPage id={match.params.id} />
        )} />

        <Route component={NotFound} />

      </Switch>
    </Router>
  )
}

export default App;
