"use client";

import { useState } from "react";
import { SAMPLE_POSTS } from "../../constants/content";
import { PostData } from "../../types";
import Presentation from "./presentation";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";

function Container() {
    const [posts, setPosts] = useState<PostData[]>(SAMPLE_POSTS);

    const [, setIsLoginModalOpen] = useLocalStorage("isLoginModalOpen");

    const handlePostCreated = (newPost: PostData) => {
        setPosts([newPost, ...posts]);
    };

    const openLoginModal = () => setIsLoginModalOpen(true);

    return (
        <>
            <Presentation
                posts={posts}
                onPostCreated={handlePostCreated}
                onLoginClick={openLoginModal}
            />
        </>
    );
}

export default Container;
