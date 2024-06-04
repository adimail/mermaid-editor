import { Metadata } from "next";
import { NavBar } from "@/components/nav/nav";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  metadataBase: new URL("https://mermaid-mind.vercel.app/"),
  title: "About - Mermaid Mind",
  description:
    "Learn more about our project and its key features. Discover the technology stack we used to create this platform and explore the exciting functionalities it offers.",
  openGraph: {
    images: [`https://mermaid-mind.vercel.app/opengraph-image.png`],
  },
};

const techStack = [
  { name: "Next.js 14", url: "https://nextjs.org" },
  { name: "NextAuth", url: "https://next-auth.js.org" },
  { name: "Zustand", url: "https://zustand-demo.pmnd.rs/" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com" },
  { name: "Next.js tRPC", url: "https://trpc.io/" },
  { name: "MongoDB", url: "https://www.mongodb.com" },
  { name: "Vercel", url: "https://vercel.com" },
  {
    name: "svg-pan-zoom",
    url: "https://www.npmjs.com/package/react-svg-pan-zoom",
  },
  { name: "Mermaid JS", url: "https://mermaid-js.github.io/mermaid" },
  {
    name: "Next.js server actions",
    url: "https://nextjs.org/docs/api-reference/edge-runtime",
  },
  { name: "TypeScript", url: "https://www.typescriptlang.org" },
  { name: "Google Gemini", url: "https://cloud.google.com/gemini" },
  { name: "Vertex AI", url: "https://cloud.google.com/vertex-ai" },
  { name: "Google Cloud Platform", url: "https://cloud.google.com" },
];

const features = [
  "Generate mermaid diagrams using natural language",
  "Save diagrams locally as PNG files",
  "Pan and zoom the generated diagram",
  "Save diagrams on cloud",
  "Share the diagrams using links",
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-start justify-between bg-gray-50">
      <NavBar />
      <div className="container my-5 flex justify-center">
        <div className="mb-5 max-w-2xl space-y-4 px-4">
          <h1 className="mb-6 text-4xl font-bold">About Mermaid Mind</h1>
          <Image
            src={"/opengraph-image.png"}
            alt="Hero image of mermaid mind"
            height={630}
            width={1200}
          />
          <p className="text-justify">
            Mermaid Mind is an online MermaidJS editor and AI-powered tool
            powered by Gemini and Monaco Editor for creating Mermaid JS
            diagrams, including flowcharts, sequence diagrams, Gantt charts,
            quad charts, class diagrams, pie charts, ER diagrams, and more.
            Customize the configuration and themes of the Mermaid editor to suit
            your preferences. Save your diagrams to your account and share them
            publicly via Mermaid Mind URLs. Simply copy the URLs to share your
            diagrams with anyone, anywhere.
          </p>
          <Separator className="h-0.5 bg-black" />
          <h2 className="mt-6 text-2xl font-semibold">Tech stack used</h2>
          <ul className="list-inside list-disc">
            {techStack.map((tech) => (
              <li key={tech.name}>
                <Link href={tech.url} className="text-blue-600 hover:underline">
                  {tech.name}
                </Link>
              </li>
            ))}
          </ul>
          <Separator className="h-0.5 bg-black" />
          <h2 className="mt-6 text-2xl font-semibold">Credits</h2>
          <ul className="list-inside list-disc">
            <li>
              <Link
                href="https://github.com/shadcn/ui"
                className="text-blue-600 hover:underline"
              >
                shadcn/ui
              </Link>
              - For the awesome reusable components library.
            </li>
            <li>
              <Link
                href="https://microsoft.github.io/monaco-editor/"
                className="text-blue-600 hover:underline"
              >
                Monaco Editor
              </Link>
              - Editor that powers VS Code is used for Mermaid Mind.
            </li>
            <li>
              <Link
                href="https://microsoft.github.io/monaco-editor/"
                className="text-blue-600 hover:underline"
              >
                MongoDB Atlas
              </Link>
              - Fully managed cloud provider for storing mermaid diagrams.
            </li>
          </ul>
          <Separator className="h-0.5 bg-black" />
          <h2 className="mt-6 text-2xl font-semibold">Key features</h2>
          <ul className="list-inside list-disc">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          {/* <Separator className="h-0.5 bg-black" />
          <h2 className="mt-6 text-2xl font-semibold">
            Notes on feature engineering
          </h2>
          <p className="text-justify">
            Mermaid mind interacts with 
            LLM via an API. You can configure a few parameters to get different
            results for your prompts. Tweaking these settings are important to
            improve reliability and desirability of responses and it takes a bit
            of experimentation to figure out the proper settings for your use
            cases. Below are the common settings you will come across when using
            different LLM providers:
          </p> */}
          <Separator className="h-0.5 bg-black" />
          <h2 className="mt-6 text-2xl font-semibold">About the author</h2>
          <div className="mt-4 flex justify-center space-x-6">
            <Link
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-2xl text-gray-600 hover:text-blue-700" />
            </Link>
            <Link
              href="https://github.com/adimail"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-2xl text-gray-600 hover:text-black" />
            </Link>
            <Link
              href="https://twitter.com/adityagodse381"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-2xl text-gray-600 hover:text-blue-500" />
            </Link>
            <Link
              href="https://adimail.github.io/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGlobe className="text-2xl text-gray-600 hover:text-blue-500" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
