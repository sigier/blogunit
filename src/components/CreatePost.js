import API, { graphqlOperation } from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import React, { Component } from 'react';
import { createPost } from '../graphql/mutations';

class CreatePost extends Component {
    state = {
        postOwnerId:'',
        postOwnerUsername:'',
        postTitle:'',
        postBody:'' 
    }

    componentDidMount = async () => {
        await Auth.currentUserInfo()
        .then(user => {
            console.log(user);
            this.setState({
                postOwnerId: user.attributes.sub,
                postOwnerUsername: user.username
            });
        });
    }

    handleChangePost = async (event) => this.setState({
        [event.target.name]: event.target.value
    });  

    handleAddPost = async (event) => {
        event.preventDefault();
        
        const input = {
            postOwnerId: this.state.postOwnerId,
            postOwnerUsername: this.state.postOwnerUsername,
            postTitle: this.state.postTitle,
            postBody: this.state.postBody,
            createdAt: new Date().toISOString()  
        };

        await API.graphql(graphqlOperation(createPost, { input }));
        this.setState({postTitle:"",postBody: ""});
    }

    render() {
        return(
            <form
             className='add-post' 
             onSubmit={ this.handleAddPost }>
             <input 
              style={{ font:'19px' }} 
              type="text"
              placeholder="Title"
              name="postTitle"
              required
              value={ this.state.postTitle }
              onChange={ this.handleChangePost }
             >
             </input>
             <textarea
              type="text"
              name="postBody"
              rows="3"
              cols="40"
              required
              placeholder="New Blog Post"
              value={ this.state.postBody }
              onChange={ this.handleChangePost }
             >
             </textarea>
             <input 
              type="submit"
              className="btn"
              style={{ fontSize: '19px' }}
             />
            </form>
        )
    } 
}

export default CreatePost;