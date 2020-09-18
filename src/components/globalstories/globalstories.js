import React, {useEffect, useState, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import superagent from 'superagent';
import NewStory from '../blog/newStories';
import {AuthenticationContext} from '../../auth/authContext';
const API = process.env.REACT_APP_API || 'http://localhost:8080';

const GlobalStories = props =>{

  let context = useContext(AuthenticationContext);

  const [stories,setStories] = useState([]);
  const [newPost,setNewPost] = useState(false);

  useEffect(()=>{

    superagent.get(`${API}/story/global`)
    .then(result=>{
      console.log(result.body);
      setStories(result.body);
    })
    .catch(e=>{console.log(e)});
    
  },[props.id,newPost]);



  return(
    <>

      <h3 className="center margin" >Global Blog Stories:</h3>

      {context.loggedIn &&<> <div className="center">
      <NewStory newPost={newPost} setNewPost={setNewPost} blogid='global' token={context.token} />
      </div>

      
      <div className="flexContainer">
      {stories.map((story,idx)=>{
        return(
          <section className="theCard" key={idx}>
            <p className="bigFont">Story Title: {!context.loggedIn && <span>{story.title}</span>}  {context.loggedIn && <NavLink to={`/story/${story._id}`}>{story.title}</NavLink>}</p>
            <p> <span className="bigFont">Description:</span> {story.content}</p>
            <hr/>
            <p className="author center">Written By: {story.owner}, On: {story.createdat.split('T')[0]}</p>
            
          </section>
        )
      })}
      </div>
      </>}

      {!context.loggedIn && <p className="center">Please Sign in to access this page.</p>}
    </>
  )
}

export default GlobalStories;
