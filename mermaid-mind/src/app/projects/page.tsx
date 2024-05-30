import { getServerAuthSession } from "@/server/auth";
import Results from "@/components/gallery/projects";

export default async function GalleryPage() {
  const session = await getServerAuthSession();

  return <Results session={session} />;
}
