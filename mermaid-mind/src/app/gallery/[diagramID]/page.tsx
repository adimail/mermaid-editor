import DiagramEditor from "@/components/gallery/diagram";
import { getServerAuthSession } from "@/server/auth";

export default async function Page({
  params,
}: {
  params: { diagramID: string };
}) {
  const session = await getServerAuthSession();

  return <DiagramEditor diagramID={params.diagramID} session={session} />;
}
