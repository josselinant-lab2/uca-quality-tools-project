import data from "../data.json";

export type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt?: string;
    updatedAt?: string;
};

export class PostService {
    private posts: Post[];

    constructor() {
        this.posts = [...data.posts];
    }

    getAllPosts() {
        return this.posts;
    }

    getPostById(id: number) {
        return this.posts.find((post) => post.id == id);
    }

    createPost(postData: Omit<Post, "id">) {
        const newPost = {
            id: this.posts.length + 1,
            title: postData.title,
            content: postData.content,
            author: postData.author,
            createdAt: new Date().toISOString()
        };
        this.posts.push(newPost);
        return newPost;
    }

    updatePost(id: number, postData: Omit<Post, "id">) {
        const index = this.posts.findIndex((post) => post.id == id);
        if (index == -1) return null;

        const postToBeModified = this.posts[index] as Post;

        this.posts[index] = {
            ...postToBeModified,
            title: postData.title,
            content: postData.content,
            author: postData.author,
            updatedAt: new Date().toISOString()
        };

        return this.posts[index];
    }
}
