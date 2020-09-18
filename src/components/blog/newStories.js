import React, {useState} from 'react';
import superagent from 'superagent';
const API = process.env.REACT_APP_API || 'http://localhost:8080';

const NewStory = props =>{
  const [show, setShow] = useState(false);
  const [story,setStory] = useState({});

  const newStoryHandler = e =>{
    setStory({...story,[e.target.name]:e.target.value});
  }

  const submitStory = e =>{
    e.preventDefault();
    story.blogid = props.blogid;
    superagent.post(`${API}/story`)
    .auth(props.token, { type: 'bearer'})
    .send(story)
    .then(result=>{
      window.alert('New Story was added!');
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
      <button onClick={e=>{setShow(!show)}} >Create New Story</button>
      {show && 
        <form onSubmit={submitStory}>
          <label>New Story Title: </label> <input name="title" type="text" required placeholder="Story Title" onChange={newStoryHandler} />
          <label>New Story Content: </label> <input name="content" type="text" required placeholder="Story Content" onChange={newStoryHandler} />
          <button>Post New Story</button>
        </form>
      }
    </>
  )
}

export default NewStory;
