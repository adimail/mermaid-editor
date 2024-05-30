import GalleryPage from "@/components/gallery/gallery";
import { getServerAuthSession } from "@/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  return <GalleryPage session={session} />;
}
