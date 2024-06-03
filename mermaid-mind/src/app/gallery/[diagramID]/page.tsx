import DiagramEditor from "@/components/gallery/diagram";
import { getServerAuthSession } from "@/server/auth";
import { NavBar } from "@/components/nav/nav";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mermaid-mind.vercel.app/"),
  title: "Share mermaid diagrams anyone, anywhere",
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
  const session = await getServerAuthSession();

  return (
    <div>
      <NavBar />
      <DiagramEditor diagramID={params.diagramID} session={session} />
      <Footer />
    </div>
  );
}
