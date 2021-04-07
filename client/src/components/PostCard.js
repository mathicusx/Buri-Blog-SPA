import React, {useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import {AuthContext} from '../context/auth';
import LikeButton  from './LikeButton';
import DeleteButton from './DeleteButton';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

 
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
        <LikeButton user={user} post ={{id,likes,likeCount}} />
        <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
      <Button basic color='blue'>
        <Icon name='comments' />
        Comments
      </Button>
      <Label as='a' basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
    {/* check if the user that is logged in is the owner of the post. Else delete button doesnt show up*/}
    {/* {user && user.username === username && <DeleteButton postId={ id } /> } */}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
