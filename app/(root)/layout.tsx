import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import TopBar from "@/components/shared/TopBar";
import { Provider } from "@lyket/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "Next.js 13 Full-Stack Social Media Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* <Provider apiKey="pt_953e6aca455578a785077a3afed955"> */}
        <html lang="en">
          <body className={inter.className}>
            <TopBar />
            <main>
              <section className="main-container">
                <div className="w-full max-w-4xl">{children}</div>
              </section>
            </main>
          </body>
        </html>
      {/* </Provider> */}
    </ClerkProvider>
  );
}
