import { useGemini } from "../context/Bard";
import BigCard from "./BigCard";

const Card = ({ content }) => {
  const { card, setCard,selectedContent, setSelectedContent } = useGemini();

  const handleCardClick = () => {
    setCard(true); 
    console.log(content)
      setSelectedContent(content)
  };

  if (!content || !Array.isArray(content)) {
    return <p className="text-gray-500">No content available</p>;
  }

  return (
    <>
      <div
        onClick={handleCardClick}
        className="cursor-pointer text-black font-semibold text-[15px] tracking-tight w-[320px] md:w-[320px] h-[130px] md:h-[186px] p-5 md:p-5 mb-2 rounded-[12px] bg-[#d9d9d98a]"
      >
        <p className="font-semibold text-[14px] md:text-[15px] tracking-tight  md:w-[256px] mb-2 md:mb-3 text-start">
          {content[0]?.split(" ").slice(0, 10).join(" ")}
          {content[0]?.split(" ").length > 10 && "..."}
        </p>
        <p className="font-light text-[12px] md:text-[14px] tracking-normal text-[#000000] leading-5 md:leading-6 text-start">
          {content[1]?.split(" ").slice(0, 12).join(" ")}
          {content[1]?.split(" ").length > 12 && "..."}
        </p>
      </div>

      {card && <BigCard/>}
    </>
  );
};

export default Card;
