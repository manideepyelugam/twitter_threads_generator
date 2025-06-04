import React from 'react'
import Button from './Button'
import {useState} from 'react'
import { useGemini } from '../context/Bard.jsx'; // Adjust the import path as necessary

const Input = () => {

  const {input,setInput,generateThread, thread,setEmotion} = useGemini();
      const [selectedEmotion, setSelectedEmotion] = useState(null);

    const emotions = ['Happy', 'Sad', 'Excited', 'Angry'];

 function handleSelect(emotion) {



   if(selectedEmotion != null && selectedEmotion === emotion.toLowerCase()) {
      setEmotion("neutral");
    setSelectedEmotion(null);
    }else{
       setEmotion(emotion);
    setSelectedEmotion(emotion);       
    }

  }


  function genrate() {
    if (input.trim() === "") alert("Please enter a topic to generate a thread.");
    if (input.trim() === "") return;
    generateThread(input);
    setInput("");
  }

  return (
    <div className='p-4   bg-[#d9d9d98a]  rounded-[12px] w-[300px] h-[245px] md:w-[900px] md:h-[220px]'>
        <textarea
         className="w-full h-[125px] mb-1.5 p-4 text-[14px] md:text-[16px] rounded-[12px] placeholder:text-sm placeholder:text-start placeholder:align-top placeholder:text-black focus:outline-none"
         placeholder="Your thoughts go here..."

         onChange={(e) => setInput(e.target.value)}
          value={input}
        />


        <div className='flex justify-between flex-col  md:flex-row h-[30px] md:items-center items-end mt-2'>
            <div className='flex gap-2'>
          {emotions.map((emotion) => (
            <Button key={emotion} Text={emotion} isSelected={selectedEmotion === emotion.toLowerCase()}
          onSelect={handleSelect} />
          ))}

            </div>
            <div>
                <button onClick={() => genrate()} className="bg-[#000] text-white  text-[10px] md:text-[14px] font-normal mt-2 py-2 px-4 rounded-[8px] tracking-tight ">Send</button>
            </div>
        </div>
    </div>
  )
}

export default Input