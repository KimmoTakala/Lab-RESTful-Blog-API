const store = require('../store.js')

module.exports = {
    getComments(req, res) {
        let post = store.posts[req.params.id]
        if (!post) {
            return res.sendStatus(404)
        }
        res.status(200).send(post.comments)
    }, 
    addComment(req, res) {
        if (!req.body.text) {
            return res.sendStatus(400)
        }
        let post = store.posts[req.params.id]
        if (!post) {
            return res.sendStatus(404)
        }
        let commentId = post.comments.length
        post.comments.push({"id": commentId, "text": req.body.text})
        res.status(201).send('' + commentId)
    },
    updateComment(req, res) {
        if (!req.body.text) {
            return res.sendStatus(400)
        }
        let post = store.posts[req.params.id]
        if (!post) {
            return res.sendStatus(404)
        }
        let comment = post.comments[req.params.commentId]
        if (!comment) {
            return res.sendStatus(404)
        }
        comment.text = req.body.text
        res.sendStatus(200)
    },
    removeComment(req, res) {
        let post = store.posts[req.params.id]
        if (!post) {
            return res.sendStatus(404)
        }
        let comment = post.comments[req.params.commentId]
        if (!comment) {
            return res.sendStatus(404)
        }
        post.comments.splice(req.params.commentId, 1)
        res.sendStatus(200)
    }  
  }