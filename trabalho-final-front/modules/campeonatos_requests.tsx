import axios from "../api/axios";

export const getData = async (endpoint: string, condition?: string) => {
  try {
    const res = await axios.get(
      `${endpoint}${condition ? `?${condition}` : ""}`
    );
    const body = res.data;

    return { data: body };
  } catch (error) {
    throw error;
  }
};
