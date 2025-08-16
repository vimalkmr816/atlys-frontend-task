"use client";

import { useAuth } from "@/src/components/provider/auth";
import { Button } from "@mantine/core";
import { LogIn, LogOut, Mouse } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Component = () => {
    const { username, logout } = useAuth();
    const [isloading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await logout();
            toast.success("Logout successful");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error: unknown) {
            toast.error("Logout failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <header className="bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <span className="rotate-90">
                            <Mouse
                                size={24}
                                strokeWidth={2.5}
                                color="black"
                            />
                        </span>
                        <h1 className="text-xl font-bold text-gray-900">
                            foo-rum
                        </h1>
                    </div>

                    <RightIcon
                        username={username}
                        handleLogout={handleLogout}
                        isloading={isloading}
                    />
                </div>
            </div>
        </header>
    );
};

export default Component;

function RightIcon({
    handleLogout,
    isloading,
}: {
    username: string;
    handleLogout: () => void;
    isloading: boolean;
}) {
    const { isLoggedIn, username, setIsLoginModalOpen } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    if (pathname === "/signin" || pathname === "/signup") {
        return (
            <div className="flex items-center space-x-3">
                <Button
                    variant="transparent"
                    color="black"
                    className="cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    Back to Home
                </Button>
            </div>
        );
    }
    return (
        <div className="flex items-center space-x-3">
            {isLoggedIn ? (
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-700">
                        Welcome, {username}!
                    </span>
                    <Button
                        variant="transparent"
                        color="red"
                        leftSection={<LogOut size={16} />}
                        onClick={handleLogout}
                        loading={isloading}
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <Button
                    onClick={() =>
                        setIsLoginModalOpen({
                            signIn: true,
                            signUp: false,
                        })
                    }
                    variant="transparent"
                    color="purple"
                    leftSection={<LogIn size={16} />}
                >
                    Login
                </Button>
            )}
        </div>
    );
}
