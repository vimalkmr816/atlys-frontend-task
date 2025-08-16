"use client";

import { useAuth } from "@/src/components/provider/auth";
import { DEFAULT_USER, TIMESTAMPS } from "@/src/constants/content";
import { CreatePostProps } from "@/src/types";
import { useReducer } from "react";
import Presentation from "./presentation";

interface CreatePostContainerProps extends CreatePostProps {
    onLoginClick?: () => void;
}

export type InputAction =
    | { type: "SET_INPUT"; payload: string }
    | { type: "SET_EMOJI"; payload: string }
    | { type: "RESET_INPUT" }
    | { type: "SET_ERROR"; payload: string }
    | { type: "CLEAR_ERROR" };

export interface InputState {
    value: string;
    emoji: string;
    error: string;
}

function inputReducer(state: InputState, action: InputAction): InputState {
    switch (action.type) {
        case "SET_INPUT":
            return { ...state, value: action.payload, error: "" };
        case "SET_EMOJI":
            return { ...state, emoji: action.payload };
        case "RESET_INPUT":
            return { ...state, value: "", emoji: "", error: "" };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "CLEAR_ERROR":
            return { ...state, error: "" };
        default:
            return state;
    }
}

function Container({ onPostCreated }: CreatePostContainerProps) {
    const { isLoggedIn, setIsLoginModalOpen } = useAuth();
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: "",
        emoji: "",
        error: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoggedIn) {
            setIsLoginModalOpen({ signIn: true, signUp: false });
            return;
        }

        // Handle errors also
        if (!inputState.value.trim()) {
            dispatch({
                type: "SET_ERROR",
                payload: "Post content cannot be empty.",
            });
            return;
        } else {
            dispatch({ type: "CLEAR_ERROR" });
        }

        const newPost = {
            id: Date.now().toString(),
            author: DEFAULT_USER,
            content: inputState.value.trim(),
            emoji: inputState.emoji,
            timestamp: TIMESTAMPS.justNow,
            likes: 0,
            comments: [],
        };

        onPostCreated(newPost);

        dispatch({ type: "RESET_INPUT" });
    };

    return (
        <Presentation
            onSubmit={handleSubmit}
            inputState={inputState}
            dispatch={dispatch}
        />
    );
}

export default Container;
