"use client";

import { Button } from "@mantine/core";
import { COMMENT_PLACEHOLDER } from "@/src/constants/content";

interface ComponentProps {
    newComment: string;
    onCommentChange: (comment: string) => void;
    onCommentSubmit: () => void;
}

function Component({
    newComment,
    onCommentChange,
    onCommentSubmit,
}: ComponentProps) {
    return (
        <div className="flex space-x-2 mb-4">
            <input
                type="text"
                value={newComment}
                onChange={(e) => onCommentChange(e.target.value)}
                placeholder={COMMENT_PLACEHOLDER}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                onKeyDown={(e) => e.key === "Enter" && onCommentSubmit()}
            />
            <Button
                variant="filled"
                color="indigo"
                size="md"
                radius="md"
                onClick={onCommentSubmit}
            >
                Post
            </Button>
        </div>
    );
}
export default Component;
