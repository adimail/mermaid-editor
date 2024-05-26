// import { CreatePost } from "@/components/create-post";
// import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import MermaidEditor from "../components/EditorComponent";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  return (
    // <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#a361ff] to-[#6c71d1] text-white">
    <main className="flex min-h-screen flex-col items-center text-white">
      <MermaidEditor />
      <p className="text-sm text-white">
        {hello ? hello.greeting : "Loading tRPC query..."}
      </p>
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
