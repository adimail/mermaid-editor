import MermaidEditor from "../components/EditorComponent";
import Explore from "@/components/explore";
import ChatBar from "@/components/chat";
import Creations from "@/components/creations/creations";
import Guide from "@/components/guide";
import { NavBar } from "@/components/nav/nav";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col text-white">
      <NavBar />
      <ChatBar />
      <MermaidEditor />
      <Creations />
      <Explore />
      <Guide />
    </main>
  );
}
