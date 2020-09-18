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
      <main>
        <h2>Admin Dashboard</h2>
        <div className="flexContainer">
        {story.map((post,idx)=>{
          return(
            <section className="theCard" key={idx}>
                <p>Story Title: {post.title}</p>
                <p>Story Description: {post.content}</p>
                <div className="center">
                  <button onClick={()=>handleDelete(post._id)}>DELETE GOAL</button>
                  <button name={post._id} onClick={showEditForm}>Edit Story</button>
                </div>
                <Show condition={edit[post._id]}>
                <form onSubmit={(e) => updateSubmit(post._id, e)}>
                <label>Title</label><input type='text' placeholder={post.title} name='title' onChange={handleChange} /><br/>
                
                <label>Description</label><input type='text' placeholder={post.content} name='content' onChange={handleChange} /><br/>


                <button>Update Story</button>
                </form>
                </Show>

            </section>
          )
        })}
        </div>
      </main>
      
      }

      {context.user.userRole !== 'admin' && <p className="bigFont center">Sign in with an admin's account</p>}

    </>
  )
}

export default Admin;
