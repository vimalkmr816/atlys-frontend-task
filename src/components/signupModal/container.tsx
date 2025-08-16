"use client";

import React from "react";
import Presentation from "./presentation";
import { useAuth } from "../provider/auth";
import { usePathname, useRouter } from "next/navigation";
import { useReducer } from "react";
import toast from "react-hot-toast";

export type LoginModalProps = {
    opened: boolean;
    onClose: () => void;
    handleSignup: (e: React.FormEvent) => Promise<void>;
    dispatch: React.Dispatch<FormAction>;
    state: FormState;
};

export type FormState = {
    username: string;
    password: string;
    repeatPassword: string;
    error: string;
    loading: boolean;
};

export type FormAction =
    | { type: "SET_USERNAME"; payload: string }
    | { type: "SET_PASSWORD"; payload: string }
    | { type: "SET_REPEAT_PASSWORD"; payload: string }
    | { type: "SET_ERROR"; payload: string }
    | { type: "RESET" }
    | { type: "SET_LOADING"; payload: boolean };

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case "SET_USERNAME":
            return { ...state, username: action.payload };
        case "SET_PASSWORD":
            return { ...state, password: action.payload };
        case "SET_REPEAT_PASSWORD":
            return { ...state, repeatPassword: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "RESET":
            return {
                username: "",
                password: "",
                repeatPassword: "",
                error: "",
                loading: false,
            };
        default:
            return state;
    }
}

export default function SignUpModal({
    onClose,
    opened,
}: {
    onClose: () => void;
    opened: boolean;
}) {
    const { signup, setIsLoginModalOpen } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const [state, dispatch] = useReducer(formReducer, {
        username: "",
        password: "",
        repeatPassword: "",
        error: "",
        loading: false,
    });

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (state.password !== state.repeatPassword) {
            toast.error("Passwords do not match. Please try again.");
            dispatch({
                type: "SET_ERROR",
                payload: "Passwords do not match",
            });
            return;
        }

        try {
            dispatch({ type: "SET_LOADING", payload: true });

            await signup({
                username: state.username,
                password: state.password,
            });

            onClose?.();
            toast.success(
                "Account created successfully, please sign in to continue"
            );

            setTimeout(() => {
                setIsLoginModalOpen({ signIn: true, signUp: false });
            }, 1000);

            dispatch({ type: "RESET" });
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to create account. Please try again.");
            }
            dispatch({
                type: "SET_ERROR",
                payload: "Failed to create account",
            });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    function onCloseModal() {
        dispatch({ type: "RESET" });
        onClose?.();
        router.back();
    }
    return (
        <Presentation
            opened={opened}
            onClose={onCloseModal}
            handleSignup={handleSignup}
            dispatch={dispatch}
            state={state}
        />
    );
}
