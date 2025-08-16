import Presentation from "./presentation";

export interface PostActionsProps {
    isLiked: boolean;
    onLike: () => void;
    onCommentToggle: () => void;
}

function Component({ isLiked, onLike, onCommentToggle }: PostActionsProps) {
    return (
        <Presentation
            isLiked={isLiked}
            onLike={onLike}
            onCommentToggle={onCommentToggle}
        />
    );
}
export default Component;
