import React, { createContext, useContext, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GeminiContext = createContext();

const ai = new GoogleGenerativeAI(import.meta.env.VITE_API);


export const GeminiProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [thread, setThread] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emotion, setEmotion] = useState("neutral");
    const [card,setCard] = useState(false);
      const [selectedContent, setSelectedContent] = useState(null); // <-- New



  const generateThread = async (prompt) => {
    setLoading(true);
    setError(null);
    setThread([]);
    try {



      const fullPrompt = `Generate 3 distinct Twitter threads based on the following topic: "${input}".

Each thread should:
- Have a clear heading or theme.
- Reflect a "${emotion}" tone throughout.
- Include exactly 5 tweets per thread.
- Start with a hook.
- Be informative, engaging, and under 280 characters per tweet.

Return your response as a **valid JSON array of arrays** like:
[
  ["thread1_tweet1", "thread1_tweet2", "thread1_tweet3", "thread1_tweet4", "thread1_tweet5"],
  ["thread2_tweet1", "thread2_tweet2", "thread2_tweet3", "thread2_tweet4", "thread2_tweet5"],
  ["thread3_tweet1", "thread3_tweet2", "thread3_tweet3", "thread3_tweet4", "thread3_tweet5"]
]

**Do NOT include any extra explanation, formatting, or triple backticks. Just return the raw JSON.**
`;




const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

const response = await model.generateContent(fullPrompt);


  
   
     const text = response.response.text();
     

     function extractJsonFromGeminiOutput(text) {
  // Remove triple backticks and optional "json" language tag
  return JSON.parse(
    text.replace(/```json|```/g, '').trim()
  );
}

        const jsonOutput = extractJsonFromGeminiOutput(text);

      setThread(jsonOutput);
      setLoading(false)
    } catch (err) {
      setError("Failed to generate thread.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GeminiContext.Provider
      value={{
        input,
        setInput,
        thread,
        generateThread,
        loading,
        error,
        setEmotion,card,setCard,selectedContent, setSelectedContent
      }}
    >
      {children}
    </GeminiContext.Provider>
  );
};

export const useGemini = () => useContext(GeminiContext);
