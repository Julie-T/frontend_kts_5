import { AxiosRequestHeaders } from "axios";

const BASE_URL: string | undefined = "https://api.github.com";
const HEADER_API_KEY: AxiosRequestHeaders | any = {
  auth: process.env.REACT_APP_GITHUB_API_KEY,
};

export { BASE_URL, HEADER_API_KEY };
