"use client";

import LeftContainer from "./editor/LeftContainer";
import RightContainer from "./editor/RightContainer";

export default function Home() {
  return (
    <div className="flex h-auto w-full flex-col px-3 text-black md:h-[80vh] md:max-h-[900px] md:flex-row">
      <div className="flex h-full flex-col p-2 md:h-full md:w-1/2">
        <LeftContainer />
      </div>
      <div className="flex h-full flex-col p-2 md:h-full md:w-1/2">
        <RightContainer />
      </div>
    </div>
  );
}
