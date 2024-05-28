"use client";

import { creations, samples } from "./examples";
import { useStore } from "@/store";

export default function Creations() {
  const setCode = useStore.use.setCode();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function handleCardClick(key: string) {
    scrollToTop();
    setCode(samples[key] ?? "");
  }

  return (
    <section className="mt-5 w-full py-5">
      <div className="container grid gap-6 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-800 sm:text-4xl md:text-5xl">
              Creations
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Gallary of MermaidJS diagrams
            </p>
            <p className="mt-0 pt-1 text-sm text-gray-400">
              Click on card to import to workspace
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {creations.map((product) => (
            <div
              key={product.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-slate-500 transition-all ease-in-out hover:scale-105"
              onClick={() => {
                handleCardClick(product.code);
              }}
            >
              <img
                alt="Product Image"
                className="aspect-[4/3] w-full object-cover"
                src={product.imageSrc}
              />
              <div className="bg-white p-4 text-gray-600">
                <h3 className="text-lg font-semibold transition-colors group-hover:text-primary md:text-xl">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
