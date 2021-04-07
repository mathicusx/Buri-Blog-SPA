import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { Button, Confirm, Icon } from "semantic-ui-react";

function DeleteButton({ postId }) {

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update() {
      // TODO remove post from Cache.
    },
    variables: {
      postId,
    },
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
