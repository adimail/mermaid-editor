import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import AppContextProvider from "@/providers/providers";

const siteConfig = {
  name: "Share mermaid diagrams and brainstorm visually with anyone, anywhere",
  description:
    "Diagrams made easy to share! Instantly share your creations with anyone, no logins required.",
  url: "https://mermaid-mind.vercel.app/gallery",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ["Mermaid JS", "Documentation", "Diagrams", "Tools"],
  authors: [
    {
      name: "Aditya Godse",
      url: "https://adimail.github.io",
    },
  ],
  creator: "Aditya Godse",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <AppContextProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
