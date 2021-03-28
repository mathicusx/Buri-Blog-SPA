const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");
const posts = require("./posts");
 
module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context){

      // Check if User is Authenticated
      const { username } = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Comment cannot be empty", {
          errors: {
            body: "Comment must not be empty",
          },
        });
      }
      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
    async deleteComment(_,{ postId, commentId },context ){
      // Check if user is authorized
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        // Finds The Comment that User wants to delete
        const commentIndex = post.comments.findIndex(c => c.id === commentId);

        // Check if User owns the comment
        if (post.comments[commentIndex].username === username ) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          // it should not be possible for other user to delete other comments but just in case we put this  safety measure in place.
          throw new AuthenticationError('Action not permitted');
        }
      } else{
        throw new UserInputError('Post not found');
      }
    }
  },
};
