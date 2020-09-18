import React, {useState} from 'react';
import superagent from 'superagent';
const API = process.env.REACT_APP_API || 'http://localhost:8080';

const NewContent = props =>{
  const [show, setShow] = useState(false);
  const [content,setContent] = useState({});

  const newContentHandler = e =>{
    setContent({...content,[e.target.name]:e.target.value});
  }

  const submitContent = e =>{
    e.preventDefault();
    content.storyid = props.storyid;
    superagent.post(`${API}/content`)
    .auth(props.token, { type: 'bearer'})
    .send(content)
    .then(result=>{
      window.alert('New Content was appended!');
      props.setNewPost(!props.newPost);
      setShow(!show);
    })
    .catch(e=>{
      console.log(e.response.body);
      window.alert('An Error has occured!');
    })
  }

  return(
    <>
      <button onClick={e=>{setShow(!show)}} >Create New Content</button>
      {show && 
        <form onSubmit={submitContent}>
          <label>New Content Title: </label> <input name="title" type="text" required placeholder="Content Title" onChange={newContentHandler} />
          <label>New Content Description: </label> <input name="content" type="text" required placeholder="Content Description" onChange={newContentHandler} />
          <button>Post New Content</button>
        </form>
      }
    </>
  )

}

export default NewContent;
