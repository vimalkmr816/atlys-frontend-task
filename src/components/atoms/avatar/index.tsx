import React from "react";

function Avatar({ name }: { name: string }) {
    return (
        <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center text-gray-600 font-semibold">
            {name}
        </div>
    );
}

export default Avatar;
