import React, {useState} from 'react';
import superagent from 'superagent';
const API = process.env.REACT_APP_API || 'http://localhost:8080';

const NewBlog = props =>{
  const [show, setShow] = useState(false);
  const [blog,setBlog] = useState({});

  const newBlogHandler = e =>{
    setBlog({...blog,[e.target.name]:e.target.value});
    console.log(blog);
  }

  const submitBlog = e =>{
    e.preventDefault();
    superagent.post(`${API}/blogs`)
    .auth(props.token, { type: 'bearer'})
    .send(blog)
    .then(result=>{
      console.log(result);
      window.alert('Your new blog has been created!');
      window.location.reload();
    })
    .catch(e=>{
      console.log(e.response.body);
    })
  }
  

  return(
    <>
      <button onClick={e=>{setShow(!show)}} >Create New Blog</button>
      {show && 
        <form onSubmit={submitBlog}>
          <label>New Blog Title: </label> <input name="title" type="text" required placeholder="Blog Title" onChange={newBlogHandler} />
          <label>New Blog Description: </label> <input name="content" type="text" required placeholder="Blog Description" onChange={newBlogHandler} />
          <button>Create New Blog</button>
        </form>
      }
    </>
  )
}

export default NewBlog;
