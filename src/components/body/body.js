import React , {useEffect, useState} from 'react';
import superagent from 'superagent';
import { NavLink } from 'react-router-dom';
const API = process.env.REACT_APP_API || 'http://localhost:8080';

const Body = props =>{
  const [blogs,setBlogs] = useState([])

  useEffect(()=>{
    superagent.get(`${API}/blogs`)
    .then(result=>{
      console.log(result.body);
      setBlogs([...result.body]);
    })
    .catch(e=>{console.log(e)});
  },[])

  return(
    <>
      <h2>Currently Available Blogs</h2>
      <div className="flexContainer">
      {blogs.map((post,id)=>{
        return (
        <section className="theCard" key={id}>
          <p className="bigFont">Blog: <NavLink to={`/blog/${post._id}`}><span>{post.title}</span></NavLink> </p>
          
          <hr/>
          <p className="author">Author: {post.owner}</p>
        </section>

        )
      })}
      </div>
    </>
  )
}

export default Body;
