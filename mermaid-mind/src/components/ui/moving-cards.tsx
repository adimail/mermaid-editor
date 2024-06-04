"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FiExternalLink } from "react-icons/fi";

export const ScrollCards = () => {
  const [showExamples, setShowExamples] = useState(false);

  const toggleContent = () => {
    setShowExamples(!showExamples);
  };

  const chatGuide = [
    {
      title: "Be specific about the topic",
      description:
        "Provide more details for better charts. Also mention examples if possible",
    },
    {
      title: "Use relevant keywords",
      description:
        "Include keywords related to the type of diagram and design you want",
    },
    {
      title: "Specify diagram type",
      description:
        "Based on the relationships you want to illustrate (eg. flowchart, Sequence diagram)",
    },
  ];

  const examples = [
    {
      title: "Example 1: Prime Numbers",
      description:
        "Explain the algorithm to find prime numbers between 1 to n. Use sub graphs for better organisation and readability",
    },
    {
      title: "Example 2: Merge sort",
      description:
        "Represents the steps involved in the Merge Sort algorithm. Use subgraphs to represent the division and merging stages separately",
    },
    {
      title: "Example 3: Dijkstra's algorithm",
      description:
        "Represents the steps involved in Dijkstra's Shortest Path algorithm. Show the process of updating the shortest path estimates, and the selection of the next node to process.",
    },
  ];

  const content = showExamples ? examples : chatGuide;

  return (
    <div>
      <div
        className={cn(
          "scroller .scrollbar-hide relative z-20 overflow-hidden overflow-x-auto px-5 [mask-image:linear-gradient(to_right,transparent,white_2%,white_98%,transparent)]",
        )}
      >
        <ul
          className={cn(
            "animate-scroll .scrollbar-hide flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          )}
        >
          {content.map((item, idx) => (
            <li
              className={`relative max-w-full flex-shrink-0 rounded-2xl border border-b-0 px-4 py-2 ${
                showExamples
                  ? "w-[350px] border-slate-600 md:w-[450px]"
                  : "w-[250px] border-slate-700 md:w-[350px]"
              }`}
              style={{
                background: showExamples
                  ? "linear-gradient(180deg, var(--blue-700), var(--blue-800))"
                  : "linear-gradient(180deg, var(--slate-600), var(--slate-700))",
              }}
              key={idx}
            >
              <blockquote className="flex flex-col justify-between">
                <span className="relative z-20 text-xs font-normal leading-[1.6] text-gray-100 md:text-sm">
                  {item.description}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="md:text-md text-sm font-bold leading-[1.6] text-gray-400">
                      {item.title}
                    </span>
                  </span>
                </div>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={toggleContent}
          className="flex gap-2 rounded-full border border-black bg-white px-4 py-0.5 text-xs text-black"
        >
          {showExamples ? "Show Guide" : "Show Examples"} <FiExternalLink />
        </button>
      </div>
    </div>
  );
};
