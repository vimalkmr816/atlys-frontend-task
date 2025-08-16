"use client";

import { Modal } from "@mantine/core";
import { Loader, LogIn } from "lucide-react";
import { FormAction, FormState, LoginModalProps } from "./container";

function Component({
    opened,
    onClose,
    handleLogin,
    dispatch,
    state,
    setIsLoginModalOpen,
}: LoginModalProps) {
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
                            <LogIn size={24} />
                        </div>
                        <h2 className="text-[20px] font-bold">
                            Sign in to continue
                        </h2>
                        <p className="text-gray-500">
                            Sign in to access all the features on this app
                        </p>
                    </div>
                    <SignInForm
                        handleLogin={handleLogin}
                        dispatch={dispatch}
                        state={state}
                    />
                </Modal.Body>
                <div className="flex items-center justify-center mt-3">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">
                            Do not have an account?{" "}
                        </span>
                        <button
                            onClick={() =>
                                setIsLoginModalOpen({
                                    signIn: false,
                                    signUp: true,
                                })
                            }
                            className="text-indigo-500 hover:text-indigo-600 transition-all duration-300 font-semibold"
                        >
                            <span className="font-medium">Sign Up</span>
                        </button>
                    </div>
                </div>
            </Modal.Content>
        </Modal.Root>
    );
}

export default Component;

type SignInFormProps = {
    handleLogin: (e: React.FormEvent) => void;
    dispatch: React.Dispatch<FormAction>;
    state: FormState;
};

export function SignInForm({ handleLogin, dispatch, state }: SignInFormProps) {
    return (
        <form
            className="w-full max-w-sm mx-auto"
            onSubmit={handleLogin}
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

                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium cursor-pointer active:scale-95 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600"
                    disabled={state.loading}
                >
                    {state.loading ? (
                        <Loader className="animate-spin h-5 w-5" />
                    ) : (
                        "Sign In"
                    )}
                </button>
            </div>
        </form>
    );
}
