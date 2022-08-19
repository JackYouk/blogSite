const router = require('express').Router();
const apiController = require('./apiController');
const {User} = require('../models');
const {Post} = require('../models');

router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll({
            include: [User],
        });
        const posts = postsData.map(post => post.get({plain: true}));

        const postv2 = posts.map((post) => {
            console.log(post);
            if(post.userId === req.session?.user?.id){
                post.myPost = true;
            }else{
                post.myPost = false;
            }
            return post;
        });
        

        res.render('homepage', {
            posts: postv2,
            isLoggedIn: req.session.isLoggedIn
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});


// renders signup/landing page
router.get('/signup', (req,res) => {
    res.render('signup', {
        isLoggedIn: req.session.isLoggedIn,
    });
});

router.get('/signin', (req,res) => {
    res.render('signin', {
        isLoggedIn: req.session.isLoggedIn,
    });
});


// sends routes w/ /api to apiController.js file
router.use('/api', apiController);

module.exports = router;