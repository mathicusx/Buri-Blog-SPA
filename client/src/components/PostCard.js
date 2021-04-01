import React from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {

  function likePost(){
    console.log('Liked this post')
  }
  function commentOnPost(){
    console.log("commented on this post")
  }
  return (
    <Card fluid>
      {/* TODO IMPLEMENT POSTS/ID OF POST */}
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="left"
          size="mini"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        />
        <Card.Header>{username}</Card.Header>
        {/* moment makes it from IsoString to Date Format*/}
        <Card.Meta className="card-description" floated="right">{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
        
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right' onClick={likePost}>
      <Button color='red' basic>
        <Icon name='heart' />
        Likes
      </Button>
      <Label as='a' basic color='red' pointing='left'>
        {likeCount} 
      </Label>
    </Button>
    <Button as='div' labelPosition='right' onClick={commentOnPost}>
      <Button basic color='blue'>
        <Icon name='comments' />
        Comments
      </Button>
      <Label as='a' basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
