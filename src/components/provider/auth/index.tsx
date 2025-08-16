"use client";
import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useLocalStorage } from "@mantine/hooks";
import Cookies from "js-cookie";
import SignInModal from "@/src/components/signInModal";
import SignUpModal from "../../signupModal";

const EXAMPLE_USER = {
    "demo@example.com": "password123",
    "test@user.com": "testpass",
};

interface AuthContextType {
    isLoggedIn: boolean;
    username: string;
    login: (user: { username: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    setIsLoginModalOpen: (value: { signIn: boolean; signUp: boolean }) => void;
    isLoginModalOpen: { signIn: boolean; signUp: boolean };
    signup: (user: { username: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState({
        signIn: false,
        signUp: false,
    });

    // Listen for sign up modal closing, and if a new user was added, update localStorage
    useEffect(() => {
        if (!isLoginModalOpen.signUp) {
            const users = JSON.parse(
                localStorage.getItem("EXAMPLE_USER") || "{}"
            );
            if (Object.keys(users).length === 0) {
                localStorage.setItem(
                    "EXAMPLE_USER",
                    JSON.stringify(EXAMPLE_USER)
                );
            }
        }
    }, [isLoginModalOpen.signUp]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Check if user is logged in on mount
        const loginStatus = Cookies.get("isLoggedIn");
        const user = Cookies.get("username");

        if (loginStatus === "true" && user) {
            setIsLoggedIn(true);
            setUsername(user);
        }
    }, []);

    // Utility function to add a custom delay
    function delay(ms: number) {
        return new Promise<void>((resolve) => setTimeout(resolve, ms));
    }

    const login = async (user: { username: string; password: string }) => {
        await delay(1000); // custom delay in ms
        return new Promise<void>((resolve, reject) => {
            if (
                EXAMPLE_USER[user.username as keyof typeof EXAMPLE_USER] !==
                user.password
            ) {
                console.log("Invalid username or password");
                reject(new Error("Invalid username or password"));
                return;
            }

            Cookies.set("isLoggedIn", "true", { expires: 7 });
            Cookies.set("username", user.username, { expires: 7 });
            setIsLoggedIn(true);
            setUsername(user.username);
            resolve();
        });
    };

    const logout = async () => {
        await delay(500); // custom delay in ms
        return new Promise<void>((resolve, reject) => {
            try {
                Cookies.remove("isLoggedIn");
                Cookies.remove("username");
                setIsLoggedIn(false);
                setUsername("");
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };

    function signup(user: { username: string; password: string }) {
        return new Promise<void>((resolve, reject) => {
            if (EXAMPLE_USER[user.username as keyof typeof EXAMPLE_USER]) {
                reject(new Error("Username already exists"));
                return;
            }

            EXAMPLE_USER[user.username as keyof typeof EXAMPLE_USER] =
                user.password;

            Cookies.set("isLoggedIn", "true", { expires: 7 });
            Cookies.set("username", user.username, { expires: 7 });
            setUsername(user.username);
            resolve();
        });
    }

    const authValue: AuthContextType = {
        isLoggedIn,
        username,
        login,
        logout,
        setIsLoginModalOpen,
        isLoginModalOpen,
        signup,
    };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
            <SignInModal
                opened={isLoginModalOpen.signIn}
                onClose={() =>
                    setIsLoginModalOpen({ signIn: false, signUp: false })
                }
            />

            <SignUpModal
                opened={isLoginModalOpen.signUp}
                onClose={() =>
                    setIsLoginModalOpen({ signIn: false, signUp: false })
                }
            />
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthProvider;
