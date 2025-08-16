export interface Comment {
    id: string;
    author: string;
    content: string;
    timestamp: string;
}

export interface Author {
    name: string;
    title: string;
    avatar: string;
}

export interface PostData {
    id: string;
    author: Author;
    content: string;
    emoji: string;
    timestamp: string;
    likes: number;
    comments: Comment[];
}

export interface CreatePostProps {
    onPostCreated: (post: PostData) => void;
}

export interface PostProps extends PostData {
    isLiked?: boolean;
}
