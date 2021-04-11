import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { Button, Icon } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function DeleteButton({ postId, commentId, callback }) {
  // we have 2 mutations so depending if we have the commentid we will use the comment mutation else we use post mutation.
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        //gets posts from db and sets to var oldPosts
        const oldPosts = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        //sets newData to array of objects - the deleted post
        const newData = oldPosts.getPosts.filter((p) => p.id !== postId);
        //Sets getPosts to the newPosts
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: newData,
          },
        });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });
  return (
    <Button
      as="div"
      labelPosition="right"
      floated="right"
      onClick={deletePostOrComment}
    >
      <Button color="red" basic floated="right">
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
    </Button>
  );
}
const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
mutation deleteComment($postId: ID!, $commentId: ID!){
  deleteComment(postId: $postId, commentId: $commentId){
    id
    comments{
      id 
      username
       createdAt
        body
    }
    commentCount
  }
} 
`;

export default DeleteButton;
