const Post = require('../models/post');
const Comment = require('../models/comment');


getPostPage = async (req, res, next) => {
    try {
        let postid=req.params.post;
        let post = await Post.getPostById(postid);
        let comments = await Post.getPostComments(postid);
        let postCreator = await Post.getPostCreator(postid);
        for(let c of comments){
            c.creator = await c.getCommentCreator();
        }
        let postLikes = await Post.getPostLikes(postid);
        let userid;
        let userLikedPost;
        if(req.session.user){
            userid = req.session.user.id;
            userLikedPost = await Post.getUserPostLike(postid, userid); 
        }  
            res.render('post', {
                post: post,
                title: req.params.category,
                user: req.session.user,
                comments: comments,
                currentPath: req.baseUrl+req.url,
                userLikedPost: userLikePost,
                postLikes: postLikes,
                postCreator: postCreator

            });

        } catch (error) {
            console.log(error);
            next();
        }
    } 

    module.exports.getPostPage = getPostPage;
    
   
    deletePost = async (req, res) => {
        try {
            await Post.delete(req.params.post);
            res.redirect('back');
        } catch (error) {
            console.log(error);
        }
    }
    
    module.exports.deletePost = deletePost;
    
   
    addComment = async (req, res, next) =>{  
        try {
            if(req.body.newCommentContent){
                let comment = new Comment(req.session.user.id, req.params.post, req.body.newCommentContent);
                await comment.save();
                res.json({"message":"success"})
            }
        } catch (error) {
            console.log(error);
            res.json({"message": "error"});
        }  
    }
    
    module.exports.addComment = addComment;
    
    
    updatePostLikes = async (req, res) => {
        try {
            let postId=req.params.post;
            let userid = req.session.user.id;
            await Post.updatePostLikes(userid, postId);
            res.json({"message": "success"});
        } catch (error) {
            console.log(error);
            res.json({"message": "error"});
        }
    }
    
    module.exports.updatePostLikes = updatePostLikes;
    
