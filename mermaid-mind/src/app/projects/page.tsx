import { getServerAuthSession } from "@/server/auth";
import Results from "@/components/gallery/projects";
import Footer from "@/components/footer";

export default async function GalleryPage() {
  const session = await getServerAuthSession();

  return (
    <>
      <Results session={session} />
      <Footer />
    </>
  );
}
