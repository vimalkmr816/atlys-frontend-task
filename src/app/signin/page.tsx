"use client";

import { useAuth } from "@/src/components/provider/auth";
import { SignInForm } from "@/src/components/signInModal/presentation";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useReducer } from "react";
import toast from "react-hot-toast";

export type FormState = {
    username: string;
    password: string;
    error: string;
    loading: boolean;
};

export type FormAction =
    | { type: "SET_USERNAME"; payload: string }
    | { type: "SET_PASSWORD"; payload: string }
    | { type: "SET_ERROR"; payload: string }
    | { type: "RESET" }
    | { type: "SET_LOADING"; payload: boolean };

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case "SET_USERNAME":
            return { ...state, username: action.payload };
        case "SET_PASSWORD":
            return { ...state, password: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "RESET":
            return { username: "", password: "", error: "", loading: false };
        default:
            return state;
    }
}

export default function SignInPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [state, dispatch] = useReducer(formReducer, {
        username: "",
        password: "",
        error: "",
        loading: false,
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            dispatch({ type: "SET_LOADING", payload: true });
            await login({
                username: state.username,
                password: state.password,
            });

            dispatch({ type: "RESET" });

            toast.success("Login successful");

            setTimeout(() => {
                router.push("/");
            }, 1000);
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to login. Please try again.");
            }
            dispatch({
                type: "SET_ERROR",
                payload: "Invalid username or password",
            });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
            <div className="max-w-md w-full space-y-4 bg-gray-200 rounded-3xl p-2 ">
                <div className="bg-white rounded-2xl p-4 flex flex-col gap-6 py-8">
                    <div className="text-center pb-12">
                        <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <LogIn size={24} />
                        </div>
                        <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
                            Sign in to continue
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to access all the features on this app
                        </p>
                    </div>

                    <SignInForm
                        handleLogin={handleLogin}
                        dispatch={dispatch}
                        state={state}
                    />
                </div>

                <div className="text-center m-2">
                    <span className="text-gray-600 font-medium">
                        Don&apos;t have an account?{" "}
                    </span>
                    <button
                        type="button"
                        onClick={() => router.push("/signup")}
                        className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
}
