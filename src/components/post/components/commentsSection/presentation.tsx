"use client";

import { Collapse } from "@mantine/core";
import CommentForm from "../commentForm";
import CommentList from "../commentList";
import { CommentsSectionProps } from "./container";

export default function CommentsSection({
    showComments,
    comments,
    newComment,
    onCommentChange,
    onCommentSubmit,
}: CommentsSectionProps) {
    return (
        <Collapse in={showComments}>
            <div className="py-2 border-t border-gray-100">
                <CommentForm
                    newComment={newComment}
                    onCommentChange={onCommentChange}
                    onCommentSubmit={onCommentSubmit}
                />
                <CommentList comments={comments} />
            </div>
        </Collapse>
    );
}
