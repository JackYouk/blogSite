const User = require('./User');
const Todo = require('./Todo');
const Post = require('./Post');

Todo.belongsTo(User, {
    foreignKey: 'userId',
});

User.hasMany(Todo, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'userId',
});

User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});


module.exports = {
    User,
    Todo,
    Post,
};