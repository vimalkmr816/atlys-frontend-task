import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import Header from "../components/header";
import "@/src/globals.css";
import AuthProvider from "@/src/components/provider/auth";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "LinkedIn-Style Post Feed",
    description:
        "A social media post feed with like, comment, and reply functionality",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <MantineProvider>
                    <AuthProvider>
                        <Header />
                        {children}
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 4000,
                                style: {
                                    background: "#363636",
                                    color: "#fff",
                                },
                                success: {
                                    duration: 3000,
                                    iconTheme: {
                                        primary: "#10b981",
                                        secondary: "#fff",
                                    },
                                },
                                error: {
                                    duration: 4000,
                                    iconTheme: {
                                        primary: "#ef4444",
                                        secondary: "#fff",
                                    },
                                },
                            }}
                        />
                    </AuthProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
