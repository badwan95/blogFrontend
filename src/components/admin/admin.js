import React, {useContext,useEffect,useState} from 'react';
import superagent from 'superagent';
import Show from './show';
import {AuthenticationContext} from '../../auth/authContext';
const API = process.env.REACT_APP_API || 'http://localhost:8080';

const Admin = props =>{
  let context = useContext(AuthenticationContext);
  const [story,setStory] = useState([]);
  const [edit,setEdit] = useState({});
  const [object,setObject] = useState({});
  const [update, setUpdate] = useState(false);

  const showEditForm = e =>{
    if(edit[e.target.name] === undefined){
      setEdit({...edit,[e.target.name]:true} )
    } else {
      setEdit({...edit,[e.target.name]:!edit[e.target.name]});
    }
  }

  const updateSubmit = (id,e) => {
    e.preventDefault()
    superagent.put(`${API}/story/${id}`)
    .auth(context.token, { type: 'bearer'})
    .send(object)
    .then(result=>{
        window.alert('Story Updated!');
        setUpdate(!update);
      })
      .catch(e=>{console.log(e)});
  };

  const handleChange = e => {
    setObject({...object, [e.target.name] : e.target.value});
    console.log(object);
  }

  const handleDelete = id =>{
    superagent.delete(`${API}/story/${id}`)
    .auth(context.token, { type: 'bearer'})
    .then(result=>{
        window.alert('Story Deleted!');
        setUpdate(!update);
      })
      .catch(e=>{console.log(e)});
  }

  useEffect(()=>{
    console.log(context.token)
    superagent.get(`${API}/story/`)
    .auth(context.token, { type: 'bearer'})
    .then(result=>{
      setStory(result.body);
    })
    .catch(e=>{console.log(e)});
    
  },[context.token,update]);

  return(
    <>
      {context.loggedIn && context.user.userRole === 'admin' && 
      <section>
        <p>Admin Dashboard</p>
        {story.map((post,idx)=>{
          return(
            <div key={idx}>
                <p>Story Title: {post.title}</p>
                <p>Story Description: {post.content}</p>
                <button onClick={()=>handleDelete(post._id)}>DELETE GOAL</button>
                <button name={post._id} onClick={showEditForm}>Edit Story</button>
                <Show condition={edit[post._id]}>
                <form onSubmit={(e) => updateSubmit(post._id, e)}>
                <label>Title</label><input type='text' placeholder={post.title} name='title' onChange={handleChange} />
                
                <label>Description</label>  <input type='text' placeholder={post.content} name='content' onChange={handleChange} />


                <button>Update Story</button>
                </form>
                </Show>

            </div>
          )
        })}
      </section>
      
      }

      {context.user.userRole !== 'admin' && <p>Sign in with an admin's account</p>}

      <button onClick={e=>console.log(story)} >log</button>
    </>
  )
}

export default Admin;
