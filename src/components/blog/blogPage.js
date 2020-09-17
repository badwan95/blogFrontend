import React, {useEffect, useState} from 'react';
import superagent from 'superagent';
const API = process.env.REACT_APP_API || 'http://localhost:8080';

const BlogPage = props =>{

  const [blog,setBlog] = useState({blog:{
    _id:null,
    title:null,
    content:null,
    owner:null,
    createdat:null,}
  }); // Filling it with nulls to avoid undefined errors at the initialization

  const [stories,setStories] = useState([]);

  useEffect(()=>{
    superagent.get(`${API}/blogs/${props.id}`)
    .then(result=>{
      console.log(result.body);
      setBlog({blog:result.body});
    })
    .catch(e=>{console.log(e)});
    superagent.get(`${API}/story/${props.id}`)
    .then(result=>{
      console.log(result.body);
      setStories(result.body);
    })
    .catch(e=>{console.log(e)});
    
  },[props.id]);



  return(
    <>
      <button onClick={e=>console.log(stories)} >Log params</button>
      <h2>Blog: {blog.blog.title} </h2>
      <p>Description: {blog.blog.content}  </p>
      <p>Blog Author: {blog.blog.owner}, Created On: {blog.blog.createdat} </p>

      <h3>Blog Stories:</h3>
      {stories.map((story,idx)=>{
        return(
          <section key={idx}>
            <p>Story Title: {story.title} </p>
            <p>Content: {story.title} </p>
          </section>
        )
      })}
    </>
  )
}

export default BlogPage;
