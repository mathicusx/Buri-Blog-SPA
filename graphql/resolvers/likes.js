const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    async likePost(_, { postId }, context) {
      //Check if User is Authenticated
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        // check if post is already LIKED if it is UNLIKES it.
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          //Likes Post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
          throw new UserInputError('Post not found');
      }
    },
  },
};
