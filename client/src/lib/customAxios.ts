import { toast } from "@/components/ui/use-toast";
import axios from "axios";

const customAxios = async (options) => {
  try {
    const response = await axios(options);

    return response.data.data;
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error?.response.data.error,
    });
  }
};

export default customAxios;
