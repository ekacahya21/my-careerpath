import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "my-careerpath — AI Career Growth Platform",
  description:
    "Upload your CV and let AI analyze your skills, identify gaps, and generate a personalized career growth trajectory with real-world company matches.",
  keywords: ["career", "AI", "CV analysis", "skill gap", "career growth"],
  openGraph: {
    title: "my-careerpath",
    description: "AI-driven career growth — upload your CV and get a personalized roadmap.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
