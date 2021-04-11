import React, { useContext, useState,useRef} from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";

import { Card, Grid, Form, Image, Button, Label, Icon } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

function SinglePost(props) {

  const postId = props.match.params.postId;
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null);

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update(){
      // once we submit the comment we want to empty the input
      setComment('');
      commentInputRef.current.blur();
    },
    variables:{
      postId,
      body: comment
    }
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>loading page..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="left"
              size="large"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  labelPosition="right"
                  onClick={() => console.log("Commented on post.")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                    Comments
                  </Button>
                  <Label as="a" basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card  fluid>
              <Card.Content>
              <p>Post a comment</p>
                <Form>
                  <div className="ui action input fluid">
                    <input
                    type="text"
                    placeholder="Comment.."
                    name="comment"
                    value={comment}
                    onChange={event => setComment(event.target.value)} 
                    ref={commentInputRef}
                    />
                  </div>
                  <button type="submit"
                    className="ui button blue"
                    disabled={comment.trim() === ''}
                    onClick={submitComment}
                    >
                      Submit
                    </button>
                  
                </Form>
              </Card.Content>
              </Card>
            )}
            {comments.map((comment) => ( 
              <Card fluid key={comment.id}>
                <Card.Content>
                {user && user.username === comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))} 
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!){
    createComment(postId: $postId, body:$body){
      id
      comments{
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
