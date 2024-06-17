import GalleryPage from "@/components/gallery/gallery";
import { getServerAuthSession } from "@/server/auth";
import Footer from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mermaid-mind.vercel.app/"),
  title: "Public Gallery",
  description:
    "Public archive of mermaid diagrams shared by the users on mermaid mind.",
  openGraph: {
    images: [`https://mermaid-mind.vercel.app/opengraph-image.png`],
  },
};

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <>
      <GalleryPage session={session} />
      <Footer />
    </>
  );
}
