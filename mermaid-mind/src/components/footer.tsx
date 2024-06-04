import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:gap-0">
        <div className="flex items-center gap-2 text-sm text-gray-300 dark:text-gray-400">
          <span>Created by</span>
          <Link
            href="https://adimail.github.io/about"
            className="font-medium hover:underline"
            prefetch={false}
          >
            Aditya
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-300 dark:text-gray-400">
          <Link href="/about" className="hover:underline" prefetch={false}>
            Blog
          </Link>
          <Link href="/gallery" className="hover:underline" prefetch={false}>
            Creations
          </Link>
          <Link
            href="https://github.com/adimail/mermaid-editor"
            className="hover:underline"
            prefetch={false}
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
