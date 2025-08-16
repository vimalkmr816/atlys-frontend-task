import Presentation from "./presentation";

interface CommentFormProps {
    newComment: string;
    onCommentChange: (comment: string) => void;
    onCommentSubmit: () => void;
}

function Compoent(props: CommentFormProps) {
    return <Presentation {...props} />;
}
export default Compoent;
