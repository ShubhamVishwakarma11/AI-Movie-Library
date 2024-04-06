import { BACKEND_URL } from "@/constants";
import customAxios from "@/lib/customAxios";

export const getAIMovieSummary = async (movieId: string, token: string) => {
  try {
    const options = {
      url: `${BACKEND_URL}/summary/${movieId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await customAxios(options);
    console.log("data", response.summary);
    return response.summary;
  } catch (error) {
    console.error("ERROR", error);
  }
};
