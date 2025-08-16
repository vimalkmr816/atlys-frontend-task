"use client";

import { useAuth } from "@/src/components/provider/auth";
import { Modal, PasswordInput, TextInput } from "@mantine/core";
import { Loader, LogIn } from "lucide-react";
import { useReducer } from "react";

interface LoginModalProps {
    opened: boolean;
    onClose: () => void;
}

type FormState = {
    username: string;
    password: string;
    error: string;
    loading: boolean;
};

type FormAction =
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

function Component({ opened, onClose }: LoginModalProps) {
    const { login } = useAuth();

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

            onClose();
            dispatch({ type: "RESET" });
        } catch (error: unknown) {
            console.log("======== ~ error:", error);
            dispatch({
                type: "SET_ERROR",
                payload: "Invalid username or password",
            });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    function onCloseModal() {
        dispatch({ type: "RESET" });
        onClose();
    }

    return (
        <Modal.Root
            opened={opened}
            onClose={onCloseModal}
            size="38%"
            centered
            classNames={{
                body: "mantine-body bg-white m-1 !rounded-2xl !pt-8 !pb-16 flex flex-col items-center justify-center",
                content:
                    "mantine-content !rounded-3xl p-1 bg-blue-100 !bg-gray-200 flex items-center justify-center h-full pb-4",
            }}
        >
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Body>
                    <div className="mb-16 w-full flex flex-col items-center justify-center">
                        <div className="bg-gray-100 rounded-full p-3 mb-4">
                            <LogIn size={24} />
                        </div>
                        <h2 className="text-[20px] font-bold">
                            Sign in to continue
                        </h2>
                        <p className="text-sm text-gray-500">
                            Sign in to access all the features on this app
                        </p>
                    </div>
                    <form
                        className="w-full max-w-sm"
                        onSubmit={handleLogin}
                    >
                        <div className="flex flex-col gap-8">
                            <TextInput
                                classNames={{
                                    input: "mantine-input !border-0 p-2 !bg-gray-200/50 !rounded-lg",
                                    label: "mantine-label",
                                    wrapper: "mantine-wrapper ",
                                    description: "mantine-description",
                                    error: "mantine-error",
                                }}
                                label="Email or username"
                                onChange={(e) =>
                                    dispatch({
                                        type: "SET_USERNAME",
                                        payload: e.target.value,
                                    })
                                }
                                placeholder="Enter your email or username"
                                withAsterisk={false}
                                required
                            />

                            <PasswordInput
                                classNames={{
                                    input: "mantine-input !border-0 p-2 !bg-gray-200/50 !rounded-lg",
                                    label: "mantine-label",
                                    wrapper: "mantine-wrapper ",
                                    description: "mantine-description",
                                    error: "mantine-error",
                                }}
                                label="Password"
                                onChange={(e) =>
                                    dispatch({
                                        type: "SET_PASSWORD",
                                        payload: e.target.value,
                                    })
                                }
                                placeholder="Enter your password"
                                required
                                withAsterisk={false}
                            />

                            <button
                                type="submit"
                                className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium cursor-pointer active:scale-95 transition-all duration-300 flex items-center justify-center"
                                disabled={state.loading}
                            >
                                {state.loading ? (
                                    <Loader className="animate-spin" />
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <div className="flex items-center justify-center mt-3">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">
                            Do not have an account?{" "}
                        </span>
                        <button className="text-indigo-500 hover:text-indigo-600 transition-all duration-300 font-semibold">
                            <span className="font-medium">Sign Up</span>
                        </button>
                    </div>
                </div>
            </Modal.Content>
        </Modal.Root>
    );
}

export default Component;
