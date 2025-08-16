"use client";

import { PostContentProps } from "./container";

function Component({ content, emoji }: PostContentProps) {
    return (
        <div className="flex items-start space-x-3">
            {emoji && (
                <div className="text-xl px-1 bg-gray-100 rounded-full aspect-square flex items-center justify-center">
                    {emoji}
                </div>
            )}
            <div className="flex-1">
                <p
                    className="text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </div>
    );
}
export default Component;
