import { useRouter } from "next/navigation";
import { useAuth } from "../provider/auth";
import Presentation from "./presentation";
import { useReducer } from "react";
import toast from "react-hot-toast";

export type LoginModalProps = {
    opened: boolean;
    onClose: () => void;
    handleLogin: (e: React.FormEvent) => void;
    dispatch: React.Dispatch<FormAction>;
    state: FormState;
    setIsLoginModalOpen: (value: { signIn: boolean; signUp: boolean }) => void;
};

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

const Component = ({
    opened,
    onClose,
}: {
    opened: boolean;
    onClose: () => void;
}) => {
    const { login, setIsLoginModalOpen } = useAuth();
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

            onClose?.();
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
        <Presentation
            handleLogin={handleLogin}
            dispatch={dispatch}
            setIsLoginModalOpen={setIsLoginModalOpen}
            state={state}
            opened={opened}
            onClose={onClose}
        />
    );
};

export default Component;
