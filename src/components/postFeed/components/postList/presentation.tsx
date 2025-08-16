"use client";

import { PostData } from "@/src/types";
import Post from "@/src/components/post";

interface PostListProps {
    posts: PostData[];
}

export default function PostList({ posts }: PostListProps) {
    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    {...post}
                />
            ))}
        </div>
    );
}
