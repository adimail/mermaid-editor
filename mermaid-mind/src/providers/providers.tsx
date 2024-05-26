import { EditorTypeProvider } from "./editor";
import SessionProvider from "./sessionprovider";

export default async function AppContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <EditorTypeProvider>{children}</EditorTypeProvider>
    </SessionProvider>
  );
}
