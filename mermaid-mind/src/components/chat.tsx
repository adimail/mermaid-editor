"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BsFillSendFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegStopCircle } from "react-icons/fa";
import { api } from "@/trpc/react";
import { ScrollCards } from "./ui/moving-cards";

const MaxLength = 2500;

interface ChatGuideProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatBar() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [response, setResponse] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const setCode = useStore.use.setCode();

  const mutation = api.action.getMermaidDiagram.useMutation({
    onSuccess: (diagram) => {
      console.log("Diagram received:", diagram);
      setMessage("");
      setResponse("Diagram generated successfully");
      setCode(diagram.mermaid);
      setIsGenerating(false);

      setTimeout(() => {
        setResponse("");
      }, 2500);
    },
    onError: (error) => {
      console.error("Error fetching diagram:", error);
      setResponse("Error generating diagram. Please try again.");
      setIsGenerating(false);

      setTimeout(() => {
        setResponse("");
      }, 2500);
    },
  });

  async function SendUserQuery() {
    if (message.length > 3) {
      setShowGuide(false);
      setResponse("Generating the mermaid diagram you requested...");
      setIsGenerating(true);
      mutation.mutate({ query: message });

      const userQuery = {
        message: message,
        created: new Date().toLocaleDateString(),
      };

      try {
        const response = await fetch("/api/addquery", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userQuery),
        });

        if (!response.ok) {
          console.error("Error adding query");
        } else {
          console.log("Query added successfully");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  }

  const handleStop = () => {
    mutation.reset();
    setIsGenerating(false);
    setResponse("Generation stopped.");
    setTimeout(() => {
      setResponse("");
    }, 2500);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    if (message.length > 1) {
      setShowGuide(false);
    }
  }, [message]);

  const HandleFocus = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowGuide(true);
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
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[#9e9e9e] to-[#ffffff00] shadow-lg transition-all duration-300 ease-in-out">
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className="z-50 flex justify-center px-4"
          >
            <div className="w-full max-w-[700px] rounded-3xl border bg-[#1976D2] p-2 shadow-lg dark:bg-gray-900">
              <Textarea
                className="h-5 w-full resize-none rounded-2xl border-none bg-white p-4 font-code text-xs text-gray-900 ring-0 focus:outline-none focus:ring-0"
                value={response}
                readOnly
              />
            </div>
          </motion.div>
        )}
        <div className="container flex justify-center px-0">
          <AnimatePresence>
            {showGuide && (
              <div className="absolute ml-auto w-full max-w-[700px] -translate-y-7 px-3 text-start">
                <ChatGuide visible={true} setVisible={setShowGuide} />
              </div>
            )}
          </AnimatePresence>
          <div
            className="relative flex w-full max-w-[700px] flex-col overflow-hidden rounded-t-3xl bg-gray-600 p-1 dark:bg-gray-800"
            style={{ maxHeight: "400px" }}
          >
            <div className="flex items-center pb-5 text-gray-100">
              <Textarea
                ref={textareaRef}
                className="chatbar w-full resize-none border-none bg-gray-600 py-3 text-base text-gray-200 ring-0"
                placeholder="Ask mermaid mind..."
                rows={1}
                onFocus={HandleFocus}
                value={message}
                onKeyDown={handleKeyDown}
                onChange={handleMessageChange}
                style={{ maxHeight: "100px", minHeight: "48px" }}
                maxLength={MaxLength}
                disabled={isGenerating}
              />

              {isGenerating ? (
                <Button
                  className="ml-2 rounded-full px-3 text-gray-500 hover:bg-gray-500 hover:text-gray-900"
                  size="icon"
                  variant="ghost"
                  onClick={handleStop}
                >
                  <FaRegStopCircle size={20} className=" text-slate-300" />
                </Button>
              ) : (
                <Button
                  className="rounded-full px-3 text-gray-500 hover:bg-gray-500 hover:text-gray-900"
                  size="icon"
                  variant="ghost"
                  onClick={SendUserQuery}
                >
                  <BsFillSendFill size={20} className=" text-slate-300" />
                </Button>
              )}
            </div>
            <div className="flex justify-between px-3 text-xs text-slate-300 md:text-sm">
              <span>
                {message.length}/{MaxLength}
              </span>
              <span className=" cursor-pointer hover:text-gray-400">
                Pie charts | Flow cahrts | ER diagrams
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ChatGuide: React.FC<ChatGuideProps> = ({ visible, setVisible }) => {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="fixed -bottom-[15px] left-0 right-0 z-50"
    >
      <ScrollCards />
      <button
        onClick={() => setVisible(false)}
        className="absolute right-0 top-0 z-50 mr-2 rounded-full bg-gray-500 p-1 text-white hover:bg-gray-700"
      >
        <IoCloseSharp size={18} />
      </button>
    </motion.div>
  );
};
