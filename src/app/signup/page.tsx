"use client";

import { useAuth } from "@/src/components/provider/auth";
import { SignupForm } from "@/src/components/signupModal/presentation";
import { LogIn } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useReducer } from "react";
import toast from "react-hot-toast";

type FormState = {
    username: string;
    password: string;
    repeatPassword: string;
    error: string;
    loading: boolean;
};

type FormAction =
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

export default function SignupPage() {
    const { signup } = useAuth();
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

            dispatch({ type: "RESET" });
            toast.success("Account created successfully");
            if (pathname === "/signup") {
                router.push("/signin");
            } else {
                router.push("/");
            }
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

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
            <div className="max-w-md w-full space-y-4 bg-gray-200 rounded-3xl p-2 ">
                <div className="bg-white rounded-2xl p-4 flex flex-col gap-6 py-8">
                    <div className="text-center pb-12">
                        <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <LogIn size={24} />
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Create an account to access all the features on this
                            app
                        </p>
                    </div>

                    <SignupForm
                        handleSignup={handleSignup}
                        dispatch={dispatch}
                        state={state}
                    />
                </div>
                <div className="text-center m-2">
                    <span className="text-gray-600 font-medium">
                        Already have an account?{" "}
                    </span>
                    <button
                        type="button"
                        onClick={() => router.push("/signin")}
                        className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}
