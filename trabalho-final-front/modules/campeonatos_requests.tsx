import axios from "../api/axios";

export const getData = async (endpoint: string, condition?: string) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:3000/${endpoint}${condition ? `?${condition}` : ""}`
    );
    const body = res.data;

    return { data: body };
  } catch (error) {
    throw error;
  }
};
