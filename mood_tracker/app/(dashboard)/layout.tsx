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
            <body className="flex w-full">
                <div className="basis-1/5">
                    <Navbar />
                </div>
                <div className="relative basis-4/5 flex flex-1 overflow-hidden">
                    {children}
                </div>
            </body>
        </html>
    );
}
