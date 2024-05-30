import { Tabs } from "./ui/hero-tabs";

export default function Guide() {
  const tabs = [
    {
      title: "Editor",
      value: "editor",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 px-3 pt-4 text-base text-white md:px-6 md:text-xl">
          <p className="text-xl md:text-3xl">Editor</p>
          <p className="mt-4 text-sm md:text-lg">
            Glad you made it here. Mermaid JS is a good documentation tool
            adapted by various platforms like Github for their markdowns, Google
            Colab for their notebooks. I use mermaid for my project reports,
            documentation, github readmes and more.
          </p>
        </div>
      ),
    },
    {
      title: "Mermaid JS",
      value: "mermaidjs",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-teal-800 px-3 pt-4 text-base text-white md:px-6 md:text-xl">
          <p className="text-xl md:text-3xl">Mermaid JS</p>
          <p className="mt-4 text-sm md:text-lg">
            Mermaid JS is a JavaScript-based diagramming and charting tool that
            allows you to create diagrams from text definitions. You can use it
            to visualize data and complex workflows.
          </p>
          <p>
            To read more about mermaid JS, read my{" "}
            <a
              className="text-blue-300"
              href="https://adimail.github.io/posts/mermaid-js/"
            >
              blog
            </a>
            .
          </p>
          <div className="hidden md:block">
            <pre className="mt-4 rounded-lg bg-gray-800 p-4 text-xs text-white md:text-sm">
              {`
                graph TD;
                A-->B;
                A-->C;
                B-->D;
                C-->D;
                `}
            </pre>
            <p className="mt-4 text-sm md:text-lg">
              You can edit this code to generate your own diagrams.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Gemini",
      value: "gemini",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-violet-800 px-3 pt-4 text-base text-white md:px-6 md:text-xl">
          <p className="text-xl md:text-3xl">Google Gemini</p>
          <p className="mt-4 text-sm md:text-lg">
            Google Gemini is a AI model capable of understanding and generating
            natural language. Mermaid AI uses gemini-1.5-pro as a base model to
            transform your descriptions into Mermaid JS code seamlessly. Simply
            provide a description of the diagram you want, and Gemini will
            generate the corresponding Mermaid JS code for you.
          </p>
        </div>
      ),
    },
    {
      title: "Tips",
      value: "Tips",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 to-yellow-800 px-3 pt-4 text-base text-white md:px-6 md:text-xl">
          <p className="text-xl md:text-3xl">Mermaid Tips</p>
          <p className="mt-4 text-sm md:text-lg">
            Change themes from the Config panel in editor. Available themes:
          </p>
          <ul className="mt-4 list-inside list-disc text-sm md:text-lg">
            <li>dark</li>
            <li>forest</li>
            <li>neutral</li>
            <li>base</li>
            <li>default</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="mt-20 space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter text-gray-800 sm:text-4xl md:text-5xl">
            Notes by Author
          </h2>
        </div>
      </div>
      <section>
        <div className="b relative mx-auto mb-48 mt-5 flex h-[20rem] w-full max-w-4xl flex-col items-start  justify-start [perspective:1000px] md:h-[40rem]">
          <Tabs tabs={tabs} />
        </div>
      </section>
    </>
  );
}
