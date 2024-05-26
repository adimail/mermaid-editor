import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BsFillSendFill } from "react-icons/bs";

export default function ChatBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#9e9e9e] to-[#ffffff00] pt-8 shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-950 dark:shadow-gray-800">
      <div className="container flex justify-center px-4 py-4">
        <div className="relative flex w-full max-w-[700px] items-center overflow-hidden rounded-full bg-gray-200 px-1">
          <Textarea
            className="w-full resize-none border-none bg-gray-200 px-4 py-3 text-base text-gray-900 ring-0 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-gray-50"
            placeholder="Ask mermaid mind..."
            rows={1}
            style={{
              height: "auto",
              maxHeight: "128px",
              minHeight: "48px",
            }}
          />
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
  );
}
