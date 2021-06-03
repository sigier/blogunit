import API, { graphqlOperation } from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import React, { Component } from 'react';
import {  createComment } from '../graphql/mutations';

class CommentPost extends Component {
  
    render(){
        const {content, commentOwnerUsername, createdAt } = this.props.commentData;
        return(
           <div className="comment">
               <span style={{fontStyle:"italic",color:"#0ca5e297"}}>
                {"Comment by: "} { commentOwnerUsername }
                <time
                 style={{fontStyle:"italic"}} 
                > 
                 { " " }
                 { new Date(createdAt).toDateString() }
                </time>
               </span>
               <p>
                {content}
               </p>
           </div>
        )
        
    } 
}

export default CommentPost;