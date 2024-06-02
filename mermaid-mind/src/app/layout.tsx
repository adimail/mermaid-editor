import "@/styles/globals.css";

import type { Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import AppContextProvider from "@/providers/providers";

const siteConfig = {
  name: "Mermaid Mind",
  description:
    "Create flowcharts, sequence diagrams and more with mermaid js and AI",
  url: "https://mermaid-mind.vercel.app/",
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

    creator: "@adityagodse381",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
