import { Request, Response, Router } from "express";
import Comment from "../entities/Comment";
import Post from "../entities/Post";
import Sub from "../entities/Sub";
import auth from "../middlewere/auth";
import user from "../middlewere/user";

const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;

  if (title.trim() === "")
    return res.status(400).json({ title: "Title must not be empty" });

  // Get the user from auth
  const user = res.locals.user;

  try {
    // find sub
    const subRecord = await Sub.findOneOrFail({ name: sub });

    //Create new post with user
    const post = new Post({ title, body, user, sub: subRecord });

    await post.save();

    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find({
      order: { createdAt: "DESC" },
      relations: ["comments", "votes", "sub"],
    });

    if (res.locals.user) {
      posts.forEach((p) => p.setUserVote(res.locals.user));
    }

    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  try {
    const post = await Post.findOneOrFail(
      { identifier, slug },
      { relations: ["sub", "votes", "comments"] }
    );

    if (res.locals.user) {
      post.setUserVote(res.locals.user);
    }

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Post not found!" });
  }
};

const commentOnPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  const body = req.body.body;
  const user = res.locals.user;

  if (!body || body === "")
    return res.status(401).json({ error: "Body must not be an empty value" });
  try {
    //Find post first
    const post = await Post.findOneOrFail({ identifier, slug });
    const comment = new Comment({ body, user, post });

    await comment.save();

    return res.json(comment);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Post not found" });
  }
};

const router = Router();

router.post("/", user, auth, createPost);
router.get("/", user, getPosts);
router.get("/:identifier/:slug", user, getPost);
router.post("/:identifier/:slug/comments", user, auth, commentOnPost);

export default router;
