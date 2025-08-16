"use client";

import { Plus, Mic, Camera, SendHorizontal } from "lucide-react";

interface ActionButtonsProps {
    onSubmit: (e: React.FormEvent) => void;
}

export default function ActionButtons({ onSubmit }: ActionButtonsProps) {
    return (
        <div className="flex items-center justify-between border-t border-gray-200 p-2">
            <div className="flex items-center space-x-2">
                <button
                    type="button"
                    className="p-2 rounded-lg hover:bg-gray-50 transition-colors bg-gray-100"
                >
                    <Plus size={20} />
                </button>
                <button
                    type="button"
                    className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <Mic size={20} />
                </button>
                <button
                    type="button"
                    className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <Camera size={20} />
                </button>
            </div>

            <button
                type="submit"
                onClick={onSubmit}
                className="text-white rounded-full  transition-colors flex items-center justify-center"
            >
                <SendHorizontal
                    color="blue"
                    size={24}
                />
            </button>
        </div>
    );
}
