import React from "react";
import { useGemini } from "../context/Bard";

const BigCard = () => {
  const { setCard,selectedContent, setSelectedContent } = useGemini();

    if (!selectedContent) return null;

    function copy() {
        const textToCopy = selectedContent.join("\n");
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert("Content copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    }


  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[300px] h-[450px] md:w-[400px] md:h-[560px] p-5 rounded-[12px] bg-[#d9d9d9cc]  relative">
        {/* Close Button */}
        <div className="absolute flex gap-2 top-4 right-4">
          <button
            onClick={() => copy()}
            className="border-black text-black border px-3 py-1 text-[12px] md:text-sm md:py-1.5 md:px-5  rounded-md"
          >
            Copy
          </button>

           <button
            onClick={() => setCard(false)}
            className="bg-black text-white py-1 md:py-1.5 text-sm px-3 md:px-5 text-[12px] md:text-sm rounded-md"
          >
            Close
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="mt-14 h-[85%] overflow-y-auto pr-1">
          {selectedContent.map((tweet, index) => (
            <p key={index} className="md:text-sm text-[12px] text-black mb-2">
              {tweet}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BigCard;
