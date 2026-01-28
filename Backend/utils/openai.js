import "dotenv/config";

const getOpenAIAPIResponse = async(message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [{
                role: "user",
                content: message
            }]
        })
    };

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", options);
        const data = await response.json();
        
        if (!response.ok) {
            console.error("Groq API Error:", data);
            throw new Error(data.error?.message || "Groq API request failed");
        }
        
        if (!data.choices || data.choices.length === 0) {
            console.error("No choices in response:", data);
            throw new Error("No response from Groq");
        }
        
        return data.choices[0].message.content;
    } catch(err) {
        console.error("Error in getOpenAIAPIResponse:", err.message);
        throw err;
    }
}

export default getOpenAIAPIResponse;  // ← Make sure this line exists!