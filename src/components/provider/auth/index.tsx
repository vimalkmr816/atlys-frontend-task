"use client";
import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useLocalStorage } from "@mantine/hooks";
import LoginModal from "@/src/components/loginModal";
import Cookies from "js-cookie";

const EXAMPLE_USER = {
    "demo@example.com": "password123",
    "test@user.com": "testpass",
};

interface AuthContextType {
    isLoggedIn: boolean;
    username: string;
    login: (user: { username: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    setIsLoginModalOpen: (value: boolean) => void;
    isLoginModalOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useLocalStorage({
        key: "isLoginModalOpen",
        defaultValue: false,
    });

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
                console.log("======== ~ error:", error);
                reject(error);
            }
        });
    };

    const authValue: AuthContextType = {
        isLoggedIn,
        username,
        login,
        logout,
        setIsLoginModalOpen,
        isLoginModalOpen,
    };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
            <LoginModal
                opened={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
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
