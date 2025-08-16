"use client";

import { Author } from "@/src/types";
import Avatar from "../../../atoms/avatar";

interface PostHeaderProps {
    author: Author;
    timestamp: string;
}

function Component({ author, timestamp }: PostHeaderProps) {
    return (
        <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
                <Avatar name={author.avatar || author.name.charAt(0)} />
                <div>
                    <h3 className="font-semibold text-gray-900">
                        {author.name}
                    </h3>
                    <p className="text-xs text-gray-400">{timestamp}</p>
                </div>
            </div>
        </div>
    );
}
export default Component;
