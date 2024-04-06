import { BACKEND_URL } from "@/constants";
import customAxios from "@/lib/customAxios";

export const loginController = async (email: string, password: string) => {
  try {
    const options = {
      url: `${BACKEND_URL}/user/login`,
      method: "POST",
      data: {
        email,
        password,
      },
    };
    const { token } = await customAxios(options);

    return token;
  } catch (error) {
    console.error(error);
  }
};

export const signupController = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const options = {
      url: `${BACKEND_URL}/user/signup`,
      method: "POST",
      data: {
        email,
        password,
        confirmPassword,
      },
    };
    const { token } = await customAxios(options);

    return token;
  } catch (error) {
    console.error("ERROR", error);
  }
};
