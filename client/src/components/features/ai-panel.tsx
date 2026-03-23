"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AIPanel() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

 const handleEvaluate = () => {
  setLoading(true);
  setResponse("");

  const fullText =
    "⚡ Your design is good but missing caching layer. Consider Redis to improve performance. Also think about scalability at 10M users.";

  setTimeout(() => {
    let index = 0;

    const interval = setInterval(() => {
      setResponse(fullText.slice(0, index + 1));
      index++;

      if (index >= fullText.length) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 20);
  }, 800);
};

  return (
    <div className="fixed bottom-6 right-6 w-[350px] z-50">
        <Button
          onClick={() => setOpen(!open)}
          className="mb-2 w-full bg-white/10 text-white"
    > 

  {open ? "Hide AI" : "Show AI"}
</Button>

    {open && ( 
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">

        <CardContent className="p-4 space-y-4">
          
          {/* Title */}
          <h2 className="text-white font-semibold text-lg">
            🤖 AI Design Evaluator
          </h2>

          {/* Input */}
          <textarea
            placeholder="Describe your system design..."
            className="w-full h-24 p-3 rounded-xl bg-black/40 text-white outline-none border border-white/10"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Button */}
          <Button
            onClick={handleEvaluate}
            className="w-full bg-indigo-500 hover:bg-indigo-600"
>
            {loading ? "Thinking..." : "Evaluate Design ⚡"}
           </Button>

          {/* Response */}
          {response && (
            <div className="p-3 rounded-xl bg-black/40 text-white text-sm border border-white/10">
              {response}
            </div>
          )}

        </CardContent>
      </Card>
    )}
    </div>
  );
}