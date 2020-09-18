import React, {useEffect, useState} from 'react';
import superagent from 'superagent';

const API = process.env.REACT_APP_API || 'http://localhost:8080';

const StoryPage = props =>{
  const [story,setStory] = useState({});
  const [content,setContent] = useState([]);
  useEffect(()=>{

    superagent.get(`${API}/content/${props.id}`)
    .then(result=>{
      console.log(result.body);
      setContent(result.body);
    })
    .catch(e=>{console.log(e)});

    superagent.get(`${API}/story/specific/${props.id}`)
    .then(result=>{
      console.log(result.body);
      setStory(result.body);
    })
    .catch(e=>{console.log(e)});
    
  },[props.id]);

  return(
    <>
      <p>Story Title: {story.title}</p>
      <p>Created By: {story.owner}, On: {story.createdat}</p>
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
        <button onClick={e=>console.log(content)}>log</button>
    </>
  )
}

export default StoryPage;
