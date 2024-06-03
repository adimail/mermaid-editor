import GalleryPage from "@/components/gallery/gallery";
import { getServerAuthSession } from "@/server/auth";
import Footer from "@/components/footer";

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <>
      <GalleryPage session={session} />
      <Footer />
    </>
  );
}
