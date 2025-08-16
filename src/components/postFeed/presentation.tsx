"use client";

import { PostData } from "../../types";
import CreatePost from "../createPost";
import PostList from "./components/postList";

interface PostFeedPresentationProps {
    posts: PostData[];
    onPostCreated: (post: PostData) => void;
    onLoginClick: () => void;
}

function Component({
    posts,
    onPostCreated,
    onLoginClick,
}: PostFeedPresentationProps) {
    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <CreatePost
                onPostCreated={onPostCreated}
                onLoginClick={onLoginClick}
            />

            <PostList posts={posts} />
        </div>
    );
}

export default Component;
