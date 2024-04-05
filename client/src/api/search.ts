import { BACKEND_URL } from "@/constants";
import customAxios from "@/lib/customAxios";

export const SearchMovie = async (queryTerm: string) => {
  try {
    const options = {
      url: `${BACKEND_URL}/search/${queryTerm}`,
      method: "get",
    };

    const response = await customAxios(options);

    if (response) return response;
  } catch (error) {
    console.error("ERROR", error);
  }
};
