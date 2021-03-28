const postsResolvers = require('./posts');
const userResolvers = require('./users');
const commentsResolvers = require('./comments');
const likesResolvers = require('./likes');

module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...likesResolvers.Mutation
    }
};
