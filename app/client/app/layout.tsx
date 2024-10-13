import "./globals.css";
import {QueryProvider} from "@/app/QueryProvider";
import {ReactNode} from "react";

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
        <body>
        <QueryProvider>{children}</QueryProvider>
        </body>
        </html>
    );
}
