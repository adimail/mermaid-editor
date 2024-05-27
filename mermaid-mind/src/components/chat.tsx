"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BsFillSendFill } from "react-icons/bs";
import { FaImage } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";

export default function ChatBar() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#9e9e9e] to-[#ffffff00] pt-8 shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-950 dark:shadow-gray-800">
      <div className="container flex justify-center px-4 py-4">
        <div
          className="relative flex w-full max-w-[700px] flex-col overflow-hidden rounded-3xl bg-gray-200 p-1 dark:bg-gray-800"
          style={{
            maxHeight: "400px",
          }}
        >
          <div className="flex items-center">
            <Textarea
              ref={textareaRef}
              className="w-full resize-none border-none bg-gray-200 px-4 py-3 text-base text-gray-900 ring-0 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-gray-50"
              placeholder="Ask mermaid mind..."
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                maxHeight: "100px",
                minHeight: "48px",
              }}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={handleImageUpload}
            />
            {!image && (
              <label
                htmlFor="image-upload"
                className="cursor-pointer rounded-full p-3 text-gray-500 hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              >
                <FaImage size={20} />
              </label>
            )}
            {image && (
              <div className="relative ml-3">
                <img
                  src={image}
                  alt="Preview"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <button
                  onClick={handleImageRemove}
                  className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-gray-500 p-1 text-white hover:bg-gray-700"
                >
                  <AiOutlineClose size={12} />
                </button>
              </div>
            )}
            <Button
              className="rounded-full p-3 text-gray-500 hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              size="icon"
              type="submit"
              variant="ghost"
            >
              <Link href={"/generate"}>
                <BsFillSendFill size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
