const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'userId',
});

User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
    foreignKey: 'postId',
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
});



module.exports = {
    User,
    Post,
    Comment,
};