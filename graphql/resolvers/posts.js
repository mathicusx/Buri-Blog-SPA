const { AuthenticationError } = require('apollo-server');


const Post = require("../../models/Post.js");
const checkAuth = require('../../util/check-auth');


module.exports = {
  Query: {
      // Get All Posts Query
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    // Get Post By Id Query
    async getPost(_, { postId }) {
      try {

        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
      // User Create Post
      async createPost(_,{ body }, context){
            // here we check if User passed the check-authentications.
          const user = checkAuth(context);

          if (body.trim() === '') {
            throw new Error('Post body must not be empty');
          }

          const newPost  = new Post({
              body,
              user: user.id,
              username: user.username,
              createdAt: new Date().toISOString()
          });

          const post = await newPost.save();

          return post;
      },
      async deletePost(_, { postId }, context){
        const user = checkAuth(context);

        try {
          // first we check if the user that is deleting the post is the one who created it.
          const post = await Post.findById(postId);
          if (user.username === post.username) {
            await post.delete();
            return 'Post deleted succesfully';
          } else {
            throw new AuthenticationError('Action is not allowed.');
          }
        } catch (err) {
          throw new Error(err);
        }
      }
  }
};
