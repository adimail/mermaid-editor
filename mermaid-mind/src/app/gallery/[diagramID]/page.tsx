import DiagramEditor from "@/components/gallery/diagram";
import { getServerAuthSession } from "@/server/auth";
import { Metadata } from "next";
import { NavBar } from "@/components/nav/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
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
