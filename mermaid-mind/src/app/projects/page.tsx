import { getServerAuthSession } from "@/server/auth";
import Results from "@/components/gallery/projects";
import Footer from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mermaid-mind.vercel.app/"),
  title: "Your projects",
  description: "View your saved projects on Mermaid Mind.",
  openGraph: {
    images: [`https://mermaid-mind.vercel.app/opengraph-image.png`],
  },
};

export default async function GalleryPage() {
  const session = await getServerAuthSession();

  return (
    <>
      <Results session={session} />
      <Footer />
    </>
  );
}
