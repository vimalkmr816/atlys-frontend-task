"use client";

import { useLocalStorage } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { LogIn, LogOut, Mouse } from "lucide-react";
import { useAuth } from "@/src/components/provider/auth";
import { useState } from "react";

const Component = () => {
    const { isLoggedIn, username, logout } = useAuth();
    const [isloading, setIsLoading] = useState(false);

    const [, setIsLoginModalOpen] = useLocalStorage({
        key: "isLoginModalOpen",
    });

    const openLoginModal = () => setIsLoginModalOpen("true");

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await logout();
        } catch (error) {
            console.log("======== ~ error:", error);
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
                                onClick={openLoginModal}
                                variant="transparent"
                                color="purple"
                                leftSection={<LogIn size={16} />}
                            >
                                Login
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Component;
