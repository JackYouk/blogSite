const router = require('express').Router();
const {User, Post, Comment} = require('../models');
const bcrypt = require('bcryptjs');


// -------------------------------POSTS--------------------------------------------------------
// post route
router.post('/posts', async (req, res) => {
    if(!req.session.isLoggedIn){
        res.status(401).redirect('/signin');
    }
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.user.id,
        });

        res.json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});

// delete route
router.delete('/posts/:postId', async (req,res) => {
    const id = req.params.postId;
    try {
        await Post.destroy({
            where: {
                id,
            }
        });
        res.json('delete success');
    } catch(error) {
        console.error(error);
        res.status(500).json({error});
    }
});

// put route

// comment post route
router.post('/comment', async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            postId: req.body.postId,
        }); 
        res.json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});
// comment delete route
router.delete('/comment/:commentId', async (req, res) => {
    const id = req.params.commentId;
    try {
        await Comment.destroy({
            where: {
                id,
            }
        });
        res.json('comment deleted');
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});

// -------------------------------SIGN UP/IN/OUT-----------------------------------------------
// post signup data to database
router.post('/signup', async (req, res) => {
    try {
        // adds signup data to database
        // post data: { username: '', password: ''}
        const newUser = await User.create(req.body);

        // saves user session with new user data
        req.session.save(() => {
            req.session.user = newUser;
            req.session.isLoggedIn = true;
            res.json(newUser);
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});

router.post('/signin', async (req, res) => {
    try {
        const existingUser = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if(!existingUser) {
            return res.status(401).json({error: 'invalid credentials'});
        }

        const passwordMatch = await bcrypt.compare(req.body.password, existingUser.password);

        if(!passwordMatch){
            return res.status(401).json({error: 'invalid credentials'});
        }

        req.session.save(() => {
            req.session.user = existingUser;
            req.session.isLoggedIn = true;
            res.json({success: true});
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});

router.post('/signout', async (req, res) => {
    if(req.session.isLoggedIn){
        req.session.destroy(() => {
            res.json({success: true});
        });
    }
});



module.exports = router;