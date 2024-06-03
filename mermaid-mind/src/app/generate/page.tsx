import { Metadata } from "next";
import GoogleGeminiEffectDemo from "@/components/gallery/generate";

export const metadata: Metadata = {
  metadataBase: new URL("https://mermaid-mind.vercel.app/"),
  title: "Generate with Mermaid Mind AI",
  description:
    "Create flowcharts, sequence diagrams and more with mermaid js and AI.",
  openGraph: {
    images: [`https://mermaid-mind.vercel.app/opengraph-image.png`],
  },
};

export default function Page() {
  return <GoogleGeminiEffectDemo />;
}
