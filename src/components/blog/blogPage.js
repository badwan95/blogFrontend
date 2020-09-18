import React, {useEffect, useState, useContext} from 'react';
import { NavLink } from 'react-router-dom';
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
      <section className="blogTitle">

      
      <h2>Blog: {blog.blog.title} </h2>
      <p className="center description">Description: {blog.blog.content}  </p>
      <hr/>
      <p className="author center">Blog Author: {blog.blog.owner}, Created On: {blog.blog.createdat.split('T')[0]} </p>

      </section>

      {context.loggedIn && <div className="center">
      <NewStory newPost={newPost} setNewPost={setNewPost} blogid={blog.blog._id} token={context.token} />
      </div>}



      <h3 className="center margin" >Blog Stories:</h3>
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
    </>
  )
}

export default BlogPage;
