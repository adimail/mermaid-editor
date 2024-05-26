import { EditorTypeProvider } from "./editor";

export default async function AppContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EditorTypeProvider>{children}</EditorTypeProvider>;
}
