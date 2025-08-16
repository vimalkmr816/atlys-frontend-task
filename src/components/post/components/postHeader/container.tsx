import { Author } from "@/src/types";
import Presentation from "./presentation";

interface PostHeaderProps {
    author: Author;
    timestamp: string;
}

function Compoent({ author, timestamp }: PostHeaderProps) {
    return (
        <Presentation
            author={author}
            timestamp={timestamp}
        />
    );
}
export default Compoent;
