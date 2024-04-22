import type { Metadata } from "next";
import Navbar from "../(navbar)/navbar";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Shows the tracks",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="flex w-full h-screen">
                <div className="basis-1/5 flex-1">
                    <Navbar />
                </div>
                <div className="basis-4/5 relative flex flex-1 overflow-hidden">
                    {children}
                </div>
            </body>
        </html>
    );
}
