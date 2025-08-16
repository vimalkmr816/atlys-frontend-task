import Avatar from "../../../atoms/avatar/index";

import { CommentListProps } from "./container";

function Component({ comments }: CommentListProps) {
    return (
        <div className="space-y-3">
            {comments.map((comment) => (
                <div
                    key={comment.id}
                    className="flex space-x-3"
                >
                    <Avatar name={comment.author.charAt(0)} />
                    <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                            <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold text-sm text-gray-900">
                                    {comment.author}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {comment.timestamp}
                                </span>
                            </div>
                            <p className="text-sm text-gray-800">
                                {comment.content}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Component;
