import { Comment } from "@/src/types";
import Presentation from "./presentation";

export interface CommentListProps {
    comments: Comment[];
}

function Compoent({ comments }: CommentListProps) {
    return <Presentation comments={comments} />;
}

export default Compoent;
