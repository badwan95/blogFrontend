import React, { useState } from 'react';
import superagent from 'superagent';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const API = process.env.REACT_APP_API || 'http://localhost:8080';

const NewBlog = props => {
  const [blog, setBlog] = useState({});

  const newBlogHandler = e => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  }

  const submitBlog = e => {
    e.preventDefault();
    superagent.post(`${API}/blogs`)
      .auth(props.token, { type: 'bearer' })
      .send(blog)
      .then(result => {
        window.alert('Your new blog has been created!');
        window.location.reload();
      })
      .catch(e => {
        console.log(e.response.body);
        window.alert('An Error has occured!');
      })
  }


  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Blog
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <form onSubmit={submitBlog}>
            <label>New Blog Title: </label> <input name="title" type="text" required placeholder="Blog Title" onChange={newBlogHandler} /><br/>
            <label>New Blog Description: </label> <input name="content" type="text" required placeholder="Blog Description" onChange={newBlogHandler} /><br/>
            <Button variant="primary" onClick={submitBlog}>Create New Blog</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NewBlog;
