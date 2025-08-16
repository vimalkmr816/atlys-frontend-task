import { Comment } from "@/src/types";
import Presentation from "./presentation";

export interface CommentsSectionProps {
    showComments: boolean;
    comments: Comment[];
    newComment: string;
    onCommentChange: (comment: string) => void;
    onCommentSubmit: () => void;
}

function Compoent({
    showComments,
    comments,
    newComment,
    onCommentChange,
    onCommentSubmit,
}: CommentsSectionProps) {
    return (
        <Presentation
            showComments={showComments}
            comments={comments}
            newComment={newComment}
            onCommentChange={onCommentChange}
            onCommentSubmit={onCommentSubmit}
        />
    );
}
export default Compoent;
