const { UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");
 
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
  },
};
