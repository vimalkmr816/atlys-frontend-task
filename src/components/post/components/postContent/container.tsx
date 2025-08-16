import Presentation from "./presentation";

export interface PostContentProps {
    content: string;
    emoji: string;
}

function Compoent({ content, emoji }: PostContentProps) {
    return (
        <Presentation
            emoji={emoji}
            content={content}
        />
    );
}
export default Compoent;
