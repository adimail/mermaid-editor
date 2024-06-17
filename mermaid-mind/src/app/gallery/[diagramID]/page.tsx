import DiagramEditor from "@/components/gallery/diagram";
import { NavBar } from "@/components/nav/nav";
import Footer from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mermaid-mind.vercel.app/"),
  title: "Share mermaid diagrams with anyone, anywhere",
  description:
    "Diagrams made easy to share! Instantly share your creations with anyone, no logins required to view diagrams.",
  openGraph: {
    images: [`https://mermaid-mind.vercel.app/opengraph-image.png`],
  },
};

export default async function Page({
  params,
}: {
  params: { diagramID: string };
}) {
  return (
    <div>
      <NavBar />
      <DiagramEditor diagramID={params.diagramID} />
      <Footer />
    </div>
  );
}
