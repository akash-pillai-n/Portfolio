import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "./lib/smooth-scroll";
import Navbar from "./components/Navbar";
import ClientKatana from "./components/ClientKatana";
import ClientCursorRipple from "./components/ClientCursorRipple";

// Only load JetBrains Mono — all other text uses Impact (system font)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akash Pillai — Data Scientist & AI Engineer",
  description:
    "Portfolio of Akash Pillai — MS Data Science at Texas A&M, AI systems builder, software engineer. Specializing in LLMs, RAGs, AI Agents, and full-stack development.",
  keywords: [
    "Akash Pillai",
    "Data Scientist",
    "AI Engineer",
    "Machine Learning",
    "Texas A&M",
    "Portfolio",
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Akash Pillai — Data Scientist & AI Engineer",
    description:
      "Building intelligent systems at the edge of AI and software engineering.",
    type: "website",
    images: [{ url: "/icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jetbrainsMono.variable} antialiased`}
        style={{ backgroundColor: "#0f1117" }}
      >
        <SmoothScrollProvider>
          <ClientKatana />
          <ClientCursorRipple />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
