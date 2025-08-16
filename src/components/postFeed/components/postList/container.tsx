"use client";

import { PostData } from "@/src/types";
import Presentation from "./presentation";

interface PostListProps {
    posts: PostData[];
}

export default function PostList({ posts }: PostListProps) {
    return <Presentation posts={posts} />;
}
