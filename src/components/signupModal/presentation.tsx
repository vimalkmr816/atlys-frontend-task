"use client";

import { Modal, PasswordInput, TextInput } from "@mantine/core";
import { Loader } from "lucide-react";
import { useAuth } from "../provider/auth";
import { FormAction, FormState, LoginModalProps } from "./container";

function Component({
    opened,
    onClose,
    handleSignup,
    dispatch,
    state,
}: LoginModalProps) {
    const { setIsLoginModalOpen } = useAuth();

    return (
        <Modal.Root
            opened={opened}
            onClose={onClose}
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
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 12H19M19 12L12 5M19 12L12 19"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <h2 className="text-[20px] font-bold">
                            Create an account to continue
                        </h2>
                        <p className="text-sm text-gray-500">
                            Create an account to access all the features on this
                            app
                        </p>
                    </div>
                    <SignupForm
                        handleSignup={handleSignup}
                        dispatch={dispatch}
                        state={state}
                    />
                </Modal.Body>
                <div className="flex items-center justify-center mt-3">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">
                            Already have an account?{" "}
                        </span>
                        <button
                            onClick={() =>
                                setIsLoginModalOpen({
                                    signIn: true,
                                    signUp: false,
                                })
                            }
                            className="text-indigo-500 hover:text-indigo-600 transition-all duration-300 font-semibold"
                        >
                            <span className="font-medium">Sign In</span>
                        </button>
                    </div>
                </div>
            </Modal.Content>
        </Modal.Root>
    );
}

export default Component;

export function SignupForm({
    handleSignup,
    dispatch,
    state,
}: {
    handleSignup: (e: React.FormEvent) => void;
    dispatch: React.Dispatch<FormAction>;
    state: FormState;
}) {
    return (
        <form
            className="w-full max-w-sm"
            onSubmit={handleSignup}
        >
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block font-medium text-gray-700 mb-2">
                        Email or username
                    </label>
                    <input
                        type="text"
                        className="w-full p-3 bg-gray-100 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-200"
                        placeholder="Enter your email or username"
                        value={state.username}
                        onChange={(e) =>
                            dispatch({
                                type: "SET_USERNAME",
                                payload: e.target.value,
                            })
                        }
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full p-3 bg-gray-100 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-200"
                        placeholder="Enter your password"
                        value={state.password}
                        onChange={(e) =>
                            dispatch({
                                type: "SET_PASSWORD",
                                payload: e.target.value,
                            })
                        }
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-2">
                        Repeat password
                    </label>
                    <input
                        type="password"
                        className="w-full p-3 bg-gray-100 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-200"
                        placeholder="Enter your password again"
                        value={state.repeatPassword}
                        onChange={(e) =>
                            dispatch({
                                type: "SET_REPEAT_PASSWORD",
                                payload: e.target.value,
                            })
                        }
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium cursor-pointer active:scale-95 transition-all duration-300 flex items-center justify-center"
                    disabled={state.loading}
                >
                    {state.loading ? (
                        <Loader className="animate-spin" />
                    ) : (
                        "Sign Up"
                    )}
                </button>
            </div>
        </form>
    );
}
