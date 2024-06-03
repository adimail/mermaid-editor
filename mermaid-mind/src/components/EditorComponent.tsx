"use client";

import LeftContainer from "./editor/LeftContainer";
import RightContainer from "./editor/RightContainer";

export default function Home() {
  return (
    <div className="flex h-[900px] w-full flex-col-reverse px-3 text-black md:h-[800px] md:flex-row">
      <div className="flex h-full flex-col p-2 md:w-1/2">
        <LeftContainer />
      </div>
      <div className="flex h-full flex-col p-2 md:w-1/2">
        <RightContainer />
      </div>
    </div>
  );
}
