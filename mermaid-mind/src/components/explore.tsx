const features = [
  {
    title: "Mermaid AI",
    description: "Use mermaid mind to generate diagrams from natural language.",
  },
  {
    title: "Interact with Images",
    description:
      "Give image to Mermaid AI to generate charts for respective project.",
  },
  {
    title: "Public gallery of diagrams",
    description: "Make your diagrams public and let other people discover",
  },
  {
    title: "Chat History",
    description: "Make a conversation with Mermaid Mind.",
  },
  {
    title: "Save Projects",
    description: "Save your projects and conversations with mermaid AI.",
  },
  {
    title: "Pre-built Templates",
    description: "Build your next diagram with a pre-built templates.",
  },
  {
    title: "Export Diagrams",
    description: "Save your diagrams in PNG and SVG format.",
  },
  {
    title: "Diagram Editor",
    description: "User-friendly mermaid diagram editor.",
  },
  {
    title: "Pan and Zoom",
    description: "pan and zoom features for better diagram navigation.",
  },
];

export default function Explore() {
  return (
    <>
      <h1 className="font mt-20 px-6 text-4xl font-semibold text-gray-600">
        Explore
      </h1>
      <section className="grid grid-cols-1 gap-6 px-4 py-3 sm:grid-cols-2 md:grid-cols-3 md:gap-8 md:px-6 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative transform cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105 dark:bg-gray-950"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
            <div className="relative space-y-4 p-6">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-md text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
