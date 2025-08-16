"use client";

import { Heart, MessageCircle, Send } from "lucide-react";
import { PostActionsProps } from "./container";
import toast from "react-hot-toast";

function Component({ isLiked, onLike, onCommentToggle }: PostActionsProps) {
    function onClickSend() {
        toast.error("Feature not implemented yet");
    }
    return (
        <div className="flex items-center ">
            <button
                onClick={onLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked ? "text-red-500" : "text-gray-500"
                } group`}
            >
                <span
                    className={`inline-flex transition-transform duration-150 group-hover:scale-115 ${
                        isLiked ? "animate-like-bounce" : ""
                    }`}
                >
                    <Heart
                        size={20}
                        fill={isLiked ? "currentColor" : "none"}
                    />
                </span>
            </button>

            <button
                onClick={onCommentToggle}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-gray-500 group"
            >
                <span className="inline-flex transition-transform duration-200">
                    <MessageCircle size={20} />
                </span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-gray-500">
                <Send
                    size={20}
                    onClick={onClickSend}
                />
            </button>
        </div>
    );
}
export default Component;
