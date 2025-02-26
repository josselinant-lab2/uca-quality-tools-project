import { describe, it, expect, beforeEach } from "vitest";
import PostService from "./src/services/PostService";

describe("PostService", () => {
    let postService;

    beforeEach(() => {
        postService = new PostService();
    });

    it("devrait retourner un post par ID", () => {
        const post = postService.getPostById(1);
        expect(post).toBeDefined();
        expect(post.id).toBe(1);
    });

    it("devrait retourner undefined si l'ID du post n'existe pas", () => {
        const post = postService.getPostById(999);
        expect(post).toBeUndefined();
    });

    it("devrait créer un nouveau post", () => {
        const newPost = {
            title: "Nouveau Post",
            content: "Contenu du post",
            author: "Auteur Test"
        };

        const createdPost = postService.createPost(newPost);
        expect(createdPost).toBeDefined();
        expect(createdPost.id).toBeGreaterThan(0);
        expect(createdPost.title).toBe(newPost.title);
        expect(createdPost.content).toBe(newPost.content);
        expect(createdPost.author).toBe(newPost.author);
        expect(createdPost.createdAt).toBeDefined();
    });

    it("devrait mettre à jour un post existant", () => {
        const updatedData = {
            title: "Titre mis à jour",
            content: "Contenu mis à jour",
            author: "Auteur mis à jour"
        };

        const updatedPost = postService.updatePost(1, updatedData);
        expect(updatedPost).toBeDefined();
        expect(updatedPost.id).toBe(1);
        expect(updatedPost.title).toBe(updatedData.title);
        expect(updatedPost.content).toBe(updatedData.content);
        expect(updatedPost.author).toBe(updatedData.author);
        expect(updatedPost.updatedAt).toBeDefined();
    });

    it("devrait retourner null lors de la mise à jour d'un post inexistant", () => {
        const updatedPost = postService.updatePost(999, {
            title: "Essai",
            content: "Test",
            author: "Testeur"
        });
        expect(updatedPost).toBeNull();
    });
});
