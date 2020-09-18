import React, {useEffect, useState, useContext} from 'react';
import superagent from 'superagent';
import NewStory from './newStories';
import {AuthenticationContext} from '../../auth/authContext';
const API = process.env.REACT_APP_API || 'http://localhost:8080';

const BlogPage = props =>{

  let context = useContext(AuthenticationContext);

  const [blog,setBlog] = useState({blog:{
    _id:null,
    title:null,
    content:null,
    owner:null,
    createdat:'0T',}
  }); // Filling it with nulls to avoid undefined errors at the initialization

  const [stories,setStories] = useState([]);
  const [newPost,setNewPost] = useState(false);

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
    
  },[props.id,newPost]);



  return(
    <>
      <h2>Blog: {blog.blog.title} </h2>
      <p>Description: {blog.blog.content}  </p>
      <p>Blog Author: {blog.blog.owner}, Created On: {blog.blog.createdat.split('T')[0]} </p>

      {context.loggedIn && <NewStory newPost={newPost} setNewPost={setNewPost} blogid={blog.blog._id} token={context.token} />}



      <h3>Blog Stories:</h3>
      {stories.map((story,idx)=>{
        return(
          <section key={idx}>
            <p>Story Title: {story.title} </p>
            <p>Content: {story.content} </p>
            <p>Written By: {story.owner}, On: {story.createdat.split('T')[0]}</p>
          </section>
        )
      })}
    </>
  )
}

export default BlogPage;
