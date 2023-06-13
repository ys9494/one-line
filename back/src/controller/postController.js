const { postService, commentService } = require("../service");
const { Post } = require("../data-access/models");
const util = require("../misc/util");

const postController = {
  async postPost(req, res, next) {
    try {
      const userId = req.uid;
      const { categoryId, title, content, summary } = req.body;
      const postDTO = {
        UserId: userId,
        CategoryId: categoryId,
        title,
        content,
        summary,
      };
      const newPost = await postService.createPost(postDTO);
      res.status(201).json(util.buildResponse(newPost));
    } catch (error) {
      next(error);
    }
  },

  async getPostsByCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const posts = await postService.getPostsByCategory(categoryId);
      res.status(200).json(util.buildResponse(posts));
    } catch (error) {
      next(error);
    }
  },

  async getPost(req, res, next) {
    try {
      const { postId } = req.params;
      const post = await postService.getPost(postId);
      if (!post) {
        return res.status(404).send("게시글이 존재하지 않습니다.");
      }

      // 조회수 증가
      post.views++;
      await post.save();
      res.status(200).json(util.buildResponse(post));
    } catch (error) {
      next(error);
    }
  },

  async patchPost(req, res, next) {
    try {
      const { postId } = req.params;

      const { categoryId, title, content, summary } = req.body;

      const postDTO = {
        CategoryId: categoryId,
        title,
        content,
        summary,
      };
      const updatedPost = await postService.updatePost(postId, postDTO);
      res.status(200).json(util.buildResponse(updatedPost));
    } catch (error) {
      next(error);
    }
  },

  async deletePost(req, res, next) {
    try {
      const { postId } = req.params;
      const post = await postService.deletePost(postId);
      res.status(200).json(util.buildResponse(post));
    } catch (error) {
      next(error);
    }
  },

  async patchLike(req, res, next) {
    const userId = req.uid;

    try {
      const { postId } = req.params;
      const updatedLike = await postService.updateLike(postId, userId);
      res.status(200).json(util.buildResponse(updatedLike));
    } catch (error) {
      next(error);
    }
  },

  async deleteLike(req, res, next) {
    const userId = req.uid;

    try {
      const { postId } = req.params;
      const updatedLike = await postService.deleteLike(postId, userId);
      res.status(200).json(util.buildResponse(updatedLike));
    } catch (error) {
      next(error);
    }
  },

  async uploadPostImage(req, res, next) {
    // console.log("image request : ", req);
    try {
      if (!req.file) {
        throw new Error("이미지 파일이 제공되지 않았습니다.");
      }
      const imageUrl = req.file.location;
      res.status(200).json({ imageUrl: imageUrl });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = postController;
