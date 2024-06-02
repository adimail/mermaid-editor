import DiagramEditor from "@/components/gallery/diagram";
import { getServerAuthSession } from "@/server/auth";
import { Metadata } from "next";

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

  return <DiagramEditor diagramID={params.diagramID} session={session} />;
}
