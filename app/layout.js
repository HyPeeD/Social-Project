import "@/styles/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body className={"h-dvh w-dvw font-mono"}>
                <ThemeProvider>{children}</ThemeProvider>
                <Toaster />
            </body>
        </html>
    );
}
