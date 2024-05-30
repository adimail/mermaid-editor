"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BsFillSendFill } from "react-icons/bs";
import { FaImage } from "react-icons/fa6";
import { RiCloseCircleLine } from "react-icons/ri";
import { IoCopySharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { IoMdCodeDownload } from "react-icons/io";
import { useStore } from "@/store";
import { IoCloseSharp } from "react-icons/io5";
import { api } from "@/trpc/react";

export default function ChatBar() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [response, setResponse] = useState("");
  const [showLength, setShowLength] = useState(false);
  const MaxLength = 2500;

  const mutation = api.post.getMermaidDiagram.useMutation({
    onSuccess: (diagram) => {
      console.log("Diagram received:", diagram);
      setMessage("");
      setResponse(diagram.mermaid);
      setImage(null);
    },
    onError: (error) => {
      console.error("Error fetching diagram:", error);
      setResponse("Error generating diagram. Please try again.");
    },
  });

  async function SendUserQuery() {
    if (message.length > 3) {
      setResponse("Generating the mermaid diagram you requested...");
      mutation.mutate({ query: message });
      console.log("Mutation called with message:", message);
    }
  }

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

  const HandleFocus = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowLength(true);
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const clearResponse = () => {
    setResponse("");
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= MaxLength) {
      setMessage(inputText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      SendUserQuery();
    }
  };

  return (
    <>
      <Response response={response} clearResponse={clearResponse} />
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[#9e9e9e] to-[#ffffff00] pt-8 shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-950 dark:shadow-gray-800">
        <div className="container flex justify-center px-4 py-4">
          {showLength && (
            <div className="absolute ml-auto w-full max-w-[700px] -translate-y-7 pl-3 text-start">
              <span className="text-sm text-black">
                {message.length}/{MaxLength}
              </span>
            </div>
          )}
          <div
            className="relative flex w-full max-w-[700px] flex-col overflow-hidden rounded-3xl bg-gray-200 p-1 dark:bg-gray-800"
            style={{ maxHeight: "400px" }}
          >
            <div className="flex items-center">
              <Textarea
                ref={textareaRef}
                className="w-full resize-none border-none bg-gray-200 px-4 py-3 text-base text-gray-900 ring-0 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-gray-50"
                placeholder="Ask mermaid mind..."
                rows={1}
                onFocus={HandleFocus}
                onBlur={() => setShowLength(false)}
                value={message}
                onKeyDown={handleKeyDown}
                onChange={handleMessageChange}
                style={{ maxHeight: "100px", minHeight: "48px" }}
                maxLength={MaxLength}
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
                <div className="relative pl-3">
                  <img
                    src={image}
                    alt="Preview"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <button
                    onClick={handleImageRemove}
                    className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-gray-500 p-1 text-white hover:bg-gray-700"
                  >
                    <IoCloseSharp size={12} />
                  </button>
                </div>
              )}
              <Button
                className="rounded-full px-3 text-gray-500 hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                size="icon"
                variant="ghost"
                onClick={SendUserQuery}
              >
                <BsFillSendFill size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Response = ({
  response,
  clearResponse,
}: {
  response: string;
  clearResponse: () => void;
}) => {
  if (!response) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
  };

  const setCode = useStore.use.setCode();

  function UseGeminiCode() {
    setCode(response);
    clearResponse();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-[100px] left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="w-full max-w-[700px] rounded-3xl border bg-[#1976D2] p-2 shadow-lg dark:bg-gray-900">
        <Textarea
          className="w-full resize-y rounded-t-3xl border-none bg-white p-4 font-code text-xs text-gray-900 ring-0 focus:outline-none focus:ring-0"
          style={{ resize: "vertical", maxHeight: "200px", height: "100px" }}
          value={response}
          readOnly
        />

        <div className="mt-4 flex items-center justify-end gap-3 text-sm">
          <button
            onClick={UseGeminiCode}
            className="flex items-center gap-2 rounded-full bg-gray-300 p-1 px-2 text-gray-900 hover:bg-gray-400"
          >
            Use <IoMdCodeDownload size={20} />
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 rounded-full bg-gray-300 p-1 px-2 text-gray-900 hover:bg-gray-400"
          >
            Copy <IoCopySharp size={16} />
          </button>
          <button
            onClick={clearResponse}
            className="flex items-center gap-2 rounded-full bg-gray-300 p-1 px-2 text-gray-900 hover:bg-gray-400"
          >
            Close <RiCloseCircleLine size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
