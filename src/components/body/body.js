import React , {useEffect, useState} from 'react';
import superagent from 'superagent';
const API = process.env.REACT_APP_API || 'http://localhost:8080';

const Body = props =>{
  const [blogs,setBlogs] = useState([])

  useEffect(()=>{
    superagent.get(`${API}/blogs`)
    .then(result=>{
      console.log(result.body);
      setBlogs([...result.body]);
    })
  },[])

  const logger = () =>{
    console.log(blogs);
  }

  return(
    <>
      <main>Currently Available Blogs
      {blogs.map((post,id)=>{
        return (
        <section key={id}>
          <p>Blog Title: {post.title}, <span> Author: {post.owner}</span></p>
        </section>

        )
      })}
      </main>
      <button onClick={logger}>LOG</button>
    </>
  )
}

export default Body;
