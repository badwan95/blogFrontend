import React, {useEffect, useState, useContext} from 'react';
import superagent from 'superagent';
import {AuthenticationContext} from '../../auth/authContext';
import NewContent from './newContent';

const API = process.env.REACT_APP_API || 'http://localhost:8080';

const StoryPage = props =>{
  let context = useContext(AuthenticationContext);

  const [story,setStory] = useState({});
  const [content,setContent] = useState([]);
  const [newPost,setNewPost] = useState(false);

  useEffect(()=>{

    superagent.get(`${API}/content/${props.id}`)
    .then(result=>{
      setContent(result.body);
    })
    .catch(e=>{console.log(e)});

    superagent.get(`${API}/story/specific/${props.id}`)
    .then(result=>{
      setStory(result.body);
    })
    .catch(e=>{console.log(e)});
    
  },[props.id,newPost]);

  return(
    <>
      {context.loggedIn &&
      <>
      <h2>Story: {story.title}</h2>
      <p className="author">Created By: {story.owner}, On: {story.createdat}</p>
      <div className="center">
        <NewContent className="center" newPost={newPost} setNewPost={setNewPost} storyid={story._id} token={context.token} />
      </div>

      <p className="center margin">Story Content: </p>
      <div className="flexContainer">
      {content.map((data,idx)=>{
        return(
          <section className="theCard" key={idx}>
            <p>Content Title: {data.title} </p>
            <p>Content: {data.content} </p>
            <hr/>
            <p className="author">Written By: {data.owner}, On: {data.createdat.split('T')[0]}</p>
          </section>
        )
      })}
      </div>
      </>
      }
      {!context.loggedIn && <p>Please Sign in/up before accessing stories!</p>}
    </>
  )
}

export default StoryPage;
