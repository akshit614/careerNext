import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { Toggle } from "@/components/ui/toggle";
import { Header } from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CareerNext",
  description: "Simplified career solutions",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme : dark,
    }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            >
            <Header/>
          <main className="min-h-screen"> {children} </main>
          <Toaster />
          <footer className="py-10 bg-muted/50 rounded">
            <div className="container text-center mx-auto  text-xl font-bold">
              <p>Made with 💗 by Divyanshu</p>
            </div>
          </footer>
          
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
