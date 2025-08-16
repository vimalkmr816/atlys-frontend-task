"use client";

import { Heart, MessageCircle, Send } from "lucide-react";
import { PostActionsProps } from "./container";

function Component({ isLiked, onLike, onCommentToggle }: PostActionsProps) {
    return (
        <div className="flex items-center ">
            <button
                onClick={onLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
                    isLiked ? "text-red-500" : "text-gray-500"
                }`}
            >
                <Heart
                    size={20}
                    fill={isLiked ? "currentColor" : "none"}
                />
            </button>

            <button
                onClick={onCommentToggle}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
            >
                <MessageCircle size={20} />
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                <Send size={20} />
            </button>
        </div>
    );
}
export default Component;
