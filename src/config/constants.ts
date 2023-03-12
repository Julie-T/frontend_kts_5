import { AxiosRequestHeaders } from "axios";

const BASE_URL: string | undefined = "https://api.github.com";
const HEADER_API_KEY: AxiosRequestHeaders | any = {
  auth: process.env.NODE_ENV,
};

export { BASE_URL, HEADER_API_KEY };
