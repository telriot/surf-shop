const Post = require("../models/post");

module.exports = {
  // Posts index
  async postIndex(req, res, next) {
    let posts = await Post.find({});
    res.render("posts/index", { posts });
  },
  // Posts new
  postNew(req, res, next) {
    res.render("posts/new");
  },

  // Posts create
  async postCreate(req, res, next) {
    let post = await Post.create(req.body.post);
    res.redirect(`/posts/${post.id}`);
  },

  // Posts show
  async postShow(req, res, next) {
    let post = await Post.findById(req.params.id);
    res.render("posts/show", { post });
  },

  // Posts edit
  async postEdit(req, res, next) {
    let post = await Post.findById(req.params.id);
    res.render("posts/edit", { post });
  },

  // Posts update
  async postUpdate(req, res, next) {
    let post = await Post.findByIdAndUpdate(req.params.id, req.body.post, {new: true});
    res.redirect(`/posts/${post.id}`);
  },

  //Posts delete
  async postDestroy(req, res, next) {
      await Post.findByIdAndRemove(req.params.id)
      res.redirect("/posts")
  }
};
