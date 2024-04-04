import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

export const generateAISummary = async (movie: any) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const systemPrompt = `You are a AI Movie Summary Generator. Generate a 200 words summary for a movie to help the user get a perfect all round overview of the movie. Details are provided below:
  
    Title: ${movie.title}
    Genre: ${movie.genre}
    Release Date: ${movie.released} 
    IMDB Rating: ${movie.imdbRating}
    Length: ${movie.runtime}
    Plot: ${movie.plot}
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt }],
    model: "gpt-3.5-turbo",
  });

  console.log("OPENAI RESPONSE", completion.choices[0].message.content);

  return completion.choices[0].message.content;
};
