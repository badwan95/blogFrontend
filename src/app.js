import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.scss';

//Components
import Header from './components/header/header';
import Body from './components/body/body';
import Admin from './components/admin/admin';
import BlogPage from './components/blog/blogPage';
import StoryPage from './components/blog/storyPage';
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

        <Route path='/story/:id' render={({match})=>(
          <StoryPage id={match.params.id} />
        )} />

        <Route to='/admin' component={Admin} />

        <Route component={NotFound} />

      </Switch>
    </Router>
  )
}

export default App;
