"use client";

import { PostProps } from "../../types";
import CommentsSection from "./components/commentsSection";
import PostActions from "./components/postActions";
import PostContent from "./components/postContent";

import PostHeader from "./components/postHeader";

interface PostPresentationProps extends PostProps {
    likes: number;
    isLiked: boolean;
    showComments: boolean;
    newComment: string;
    onLike: () => void;
    onCommentToggle: () => void;
    onCommentChange: (comment: string) => void;
    onCommentSubmit: () => void;
}

function Component({
    author,
    content,
    timestamp,
    comments,
    isLiked,
    showComments,
    newComment,
    emoji,
    onLike,
    onCommentToggle,
    onCommentChange,
    onCommentSubmit,
}: PostPresentationProps) {
    return (
        <div className="rounded-2xl p-2 bg-gray-100 pb-1 flex flex-col gap-1 ">
            <div className="pb-4 bg-white rounded-xl p-2  shadow-xl border border-gray-200">
                <PostHeader
                    author={author}
                    timestamp={timestamp}
                />

                <PostContent
                    content={content}
                    emoji={emoji}
                />
            </div>

            <PostActions
                isLiked={isLiked}
                onLike={onLike}
                onCommentToggle={onCommentToggle}
            />

            <CommentsSection
                showComments={showComments}
                comments={comments}
                newComment={newComment}
                onCommentChange={onCommentChange}
                onCommentSubmit={onCommentSubmit}
            />
        </div>
    );
}

export default Component;
