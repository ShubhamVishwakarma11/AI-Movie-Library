import { toast } from "@/components/ui/use-toast";
import axios from "axios";

const customAxios = async (options: any) => {
  try {
    const response = await axios(options);

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data.error,
      });
    } else {
      console.error(error);
    }
  }
};

export default customAxios;
