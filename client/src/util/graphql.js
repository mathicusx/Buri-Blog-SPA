import gql from 'graphql-tag';
// Improving code reusability
// THIS IS OUR ROOT QUERY 
export const FETCH_POSTS_QUERY = gql`
{
  getPosts {
    id
    body
    username
    createdAt
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