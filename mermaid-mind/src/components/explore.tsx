const features = [
  {
    title: "AI",
    description:
      "Use mermaid mind to generate Mermaid diagrams and markdown content from natural language.",
  },
  {
    title: "Interact with Images",
    description:
      "Create charts by uploading images of your project/topic and let AI do the work for you",
  },
  {
    title: "Chat History",
    description: "Make a conversation with Mermaid Mind",
  },
  {
    title: "Generate README Files",
    description:
      "Create a feature to generate README files from chat interactions.",
  },
  {
    title: "Save Projects",
    description: "Sign in with google to save your projects",
  },
  {
    title: "Pre-built Templates",
    description: "Develop a library of pre-built diagram templates.",
  },
  {
    title: "Export Options",
    description: "Provide export options to various formats (PNG, SVG, PDF).",
  },
  {
    title: "Diagram Editor",
    description: "Build an intuitive and user-friendly diagram editor.",
  },
  {
    title: "Markdown Editor",
    description: "Markdown editor for documentation.",
  },
  {
    title: "Download Diagrams",
    description: "Download Mermaid diagrams in multiple formats (comming soon)",
  },
  {
    title: "Pan and Zoom",
    description: "pan and zoom features for better diagram navigation.",
  },
];

export default function Explore() {
  return (
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
  );
}
