"use client";

import { useState } from "react";
import { TIMESTAMPS } from "../../constants/content";
import { PostProps, Comment } from "../../types";
import Presentation from "./presentation";
import { useAuth } from "../provider/auth";

export default function PostContainer({
    id,
    author,
    content,
    emoji,
    timestamp,
    likes: initialLikes,
    comments: initialComments,
    isLiked: initialIsLiked = false,
}: PostProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [comments, setComments] = useState(initialComments);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const { isLoggedIn, setIsLoginModalOpen } = useAuth();

    const handleLike = () => {
        if (!isLoggedIn) {
            setIsLoginModalOpen({ signIn: true, signUp: false });
            return;
        }

        if (isLiked) {
            setLikes(likes - 1);
            setIsLiked(false);
        } else {
            setLikes(likes + 1);
            setIsLiked(true);
        }
    };

    const handleCommentToggle = () => {
        setShowComments(!showComments);
    };

    const handleCommentChange = (comment: string) => {
        setNewComment(comment);
    };

    const handleCommentSubmit = () => {
        if (!isLoggedIn) {
            setIsLoginModalOpen({ signIn: true, signUp: false });
            return;
        }

        if (newComment.trim()) {
            const comment: Comment = {
                id: Date.now().toString(),
                author: "You",
                content: newComment.trim(),
                timestamp: TIMESTAMPS.justNow,
            };
            setComments([...comments, comment]);
            setNewComment("");
        }
    };

    return (
        <Presentation
            id={id}
            author={author}
            content={content}
            emoji={emoji}
            timestamp={timestamp}
            likes={likes}
            comments={comments}
            isLiked={isLiked}
            showComments={showComments}
            newComment={newComment}
            onLike={handleLike}
            onCommentToggle={handleCommentToggle}
            onCommentChange={handleCommentChange}
            onCommentSubmit={handleCommentSubmit}
        />
    );
}
