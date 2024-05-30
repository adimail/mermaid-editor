// import { CreatePost } from "@/components/create-post";
// import { getServerAuthSession } from "@/server/auth";
// import { api } from "@/trpc/server";
import MermaidEditor from "../components/EditorComponent";
import { NavBar } from "@/components/nav/nav";
import Explore from "@/components/explore";
import ChatBar from "@/components/chat";
import Creations from "@/components/creations/creations";
import Guide from "@/components/guide";
// import { api } from "@/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  return (
    <main className="mb-20 flex min-h-screen flex-col text-white">
      <NavBar />

      <ChatBar />

      <MermaidEditor />

      <Creations />

      <Explore />

      <Guide />

      {/* <p className="text-sm text-white">
        {hello ? hello.greeting : "Loading tRPC query..."}
      </p> */}
      {/* <div className="flex flex-col items-center gap-2">

          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div> */}
      {/* <CrudShowcase /> */}
    </main>
  );
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
