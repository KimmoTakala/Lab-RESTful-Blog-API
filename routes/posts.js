const store = require('../store.js')

module.exports = {
    getPosts(req, res) {
        res.status(200).send(store.posts)
    },
    addPost(req, res) {
      if (!req.body.name || !req.body.url || !req.body.text) {
          return res.sendStatus(400)
      }
      let id = store.posts.length
      let comments = []
      store.posts.push({"id": id, "name": req.body.name, "url": req.body.url, "text": req.body.text, "comments": comments})
      res.status(201).send('' + id)
    },
    updatePost(req, res) {
        if (!req.body.name || !req.body.url || !req.body.text) {
            return res.sendStatus(400)
        }
        let post = store.posts[req.params.id]
        if (!post) {
            return res.sendStatus(404)
        }
        post.name = req.body.name
        post.url = req.body.url
        post.text = req.body.text
        res.sendStatus(200)
    },
    removePost(req, res) {
        let post = store.posts[req.params.id]
        if (!post) {
            return res.sendStatus(404)
        }
        store.posts.splice(req.params.id, 1)
        res.sendStatus(200)
    }
  }