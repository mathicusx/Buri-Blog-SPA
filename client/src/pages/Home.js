import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from '../util/graphql'

function Home() {
  const { user } = useContext(AuthContext);
  // const { loading, data: { getPosts: posts }  } = useQuery(FETCH_POST_QUERY); for some reason gave me error UseQuery undefined object.
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  ); // this one works when you set it up as an empty object.

  return (
    <Grid columns={1}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row className="grid-row">
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
         <Transition.Group>
           { posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
         </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
