import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { Button, Confirm, Icon } from "semantic-ui-react";
import { FETCH_POSTS_QUERY} from '../util/graphql';

function DeleteButton({ postId, callback}) {

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
        //gets posts from db and sets to var oldPosts
        const oldPosts = proxy.readQuery({
        query: FETCH_POSTS_QUERY
        });
        //sets newData to array of objects - the deleted post
        const newData = oldPosts.getPosts.filter((p) => p.id !== postId);
        //Sets getPosts to the newPosts
        proxy.writeQuery({ 
            query: FETCH_POSTS_QUERY,
            data: { 
                getPosts: newData } 
        });
        
        if (callback) callback();
    },
    variables: {
        postId 
    }
});
  return (
    <>
      <Button
        as="div"
        labelPosition="right"
        floated="right"
        onClick={deletePost}
      >
        <Button color="red" basic floated="right">
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </Button>
      {/* <Confirm
        open={confirmOpen}

        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      /> */}
    </>
  );
}
const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
