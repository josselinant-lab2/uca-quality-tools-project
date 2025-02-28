import express from "express";
import { PostService } from "./services/PostService";
import Sentry from "../instrument";

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: true }));

const postService = new PostService();

app.get("/", (_, res) => {
    res.render("home");
});

app.get("/posts", (_, res) => {
    const posts = postService.getAllPosts();
    res.render("posts", { posts });
});

app.post("/posts", (req, res) => {
    const post = postService.createPost(req.body);
    console.log(post);
    res.redirect(`/posts`);
});

app.get("/posts/new", (_, res) => {
    res.render("new-post");
});

app.get("/posts/:id/edit", (req, res) => {
    const post = postService.getPostById(parseInt(req.params.id));
    if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
    }
    res.render("edit-post", { post });
});

app.get("/posts/:id", (req, res) => {
    const post = postService.getPostById(parseInt(req.params.id));
    if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
    }
    res.render("post", { post });
});

app.post("/posts/:id", (req, res) => {
    console.log(req.params.id);
    postService.updatePost(parseInt(req.params.id), req.body);
    res.redirect(`/posts/${req.params.id}`);
});

// Route pour tester Sentry
app.get("/debug-sentry", () => {
    throw new Error("My first Sentry error!");
});

// Middleware d'erreur Sentry
Sentry.setupExpressErrorHandler(app);

// Gestion des erreurs générales
app.use((err: Error, _req: express.Request, res: express.Response) => {
    console.error("Error captured by Sentry:", err);
    res.status(500).send("An unexpected error occurred.");
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
