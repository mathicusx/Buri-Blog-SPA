import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Label, Icon } from "semantic-ui-react";

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false); // we set the default state to be false.

  useEffect(() => {
    // useEffect tells the component to do something after Render.
    // we check if user is logged in first. then check if user has already liked the post
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? ( // we make the likeButton dynamic and if change it depending if the user has liked the post or not
    liked ? (
      <Button color="red">
        <Icon name="heart" />
        Liked
      </Button>
    ) : (
      <Button color="red" basic>
        <Icon name="heart" />
        Likes
      </Button>
    )
  ) : (
    // if user is not logged in and presses the like button he is redirected to the login page.
    // TODO ADD ERROR BEFORE REDIRECTING.
      <Button color="red" basic as={Link} to="/login">
        <Icon name="heart" />
        Likes
      </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label as="a" basic color="red" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
