import React from "react";
import { Sparkles } from "lucide-react";

const AiTools = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center bg-white">
      <div className="flex items-center gap-2 mb-4 text-[#9b2ddb]">
        <Sparkles className="w-8 h-8 animate-pulse" />
        <h2 className="text-3xl font-bold">AI Tools Section</h2>
      </div>
      <p className="text-lg text-gray-600 max-w-xl">
        This feature is under development. We’re cooking something amazing for
        you. Stay tuned!
      </p>
      <div className="mt-10">
        <span className="inline-block animate-bounce text-[#9b2ddb] text-sm">
          🚧 Work in progress...
        </span>
      </div>
    </div>
  );
};

export default AiTools;
