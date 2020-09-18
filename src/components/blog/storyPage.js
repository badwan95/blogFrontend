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
      {context.loggedin &&
      <>
      <p>Story Title: {story.title}</p>
      <p>Created By: {story.owner}, On: {story.createdat}</p>
      <NewContent newPost={newPost} setNewPost={setNewPost} storyid={story._id} token={context.token} />
      <p>Story Content: </p>
      {content.map((data,idx)=>{
        return(
          <section key={idx}>
            <p>Content Title: {data.title} </p>
            <p>Content: {data.content} </p>
            <p>Written By: {data.owner}, On: {data.createdat.split('T')[0]}</p>
          </section>
        )
      })}
      </>
      }
      {!context.loggedin && <p>Please Sign in/up before accessing stories!</p>}
    </>
  )
}

export default StoryPage;
