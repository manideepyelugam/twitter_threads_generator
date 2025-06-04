import React, { createContext, useContext, useState } from "react";
import { GoogleGenAI } from "@google/genai";

const GeminiContext = createContext();

const ai = new GoogleGenAI({ apiKey: "AIzaSyBRLg3ERLfACdxA_d8r9zeIsOa-3HJsx3s" });


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

Return your response as a **valid JSON object** like:
 [ "tweet1", "tweet2", "tweet3" ],
  in a array format.
  

**Do NOT include any extra explanation, formatting, or triple backticks. Just return the raw JSON.**
`;




const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${fullPrompt}`,
  });


  
   
     const text = response.candidates[0].content.parts[0].text;
     

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
