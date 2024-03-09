import axios from "../api/axios";

export const getStrapiData = async (endpoint: string, populate?: string) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:1337/api/${endpoint}${
        populate ? "?populate=" + populate : ""
      }`
    );
    const body = res.data;

    return { data: body };
  } catch (error) {
    throw error;
  }
};
