"use client";

import { creations, samples } from "./examples";
import { useStore } from "@/store";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Creations() {
  const setCode = useStore.use.setCode();
  const [visibleItems, setVisibleItems] = useState(5);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Function to check screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

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

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  return (
    <section className="mt-20 w-full">
      <div className="container grid gap-6 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Link
              className="cursor-pointer text-3xl font-bold tracking-tighter text-gray-800 sm:text-4xl md:text-5xl"
              href="/gallery"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? (
                "Gallery"
              ) : (
                <span className="flex w-full items-center justify-center gap-2">
                  Creations <FaExternalLinkAlt size={15} />
                </span>
              )}
            </Link>

            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Gallery of MermaidJS diagrams
            </p>
            <p className="mt-0 pt-1 text-sm text-gray-400">
              Click on card to import to workspace
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {creations
              .slice(0, isMobile ? visibleItems : creations.length)
              .map((product, index) => (
                <motion.div
                  key={index}
                  className="group relative cursor-pointer overflow-hidden rounded-lg bg-slate-500 transition-all ease-in-out hover:scale-105"
                  onClick={() => {
                    handleCardClick(product.code);
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.5 }}
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
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        {isMobile && (
          <div className="mt-6 flex justify-center">
            {visibleItems < creations.length ? (
              <button
                onClick={loadMoreItems}
                className="rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
              >
                Load More Examples
              </button>
            ) : (
              <button
                onClick={() => setVisibleItems(4)}
                className="rounded-full bg-slate-600 px-5 py-3 text-white hover:bg-slate-700"
              >
                Hide Examples
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
