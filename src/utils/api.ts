import { BASE_URL, HEADER_API_KEY } from "config/constants";
import { gitHubRepoItemApi } from "store/models/gitHub/gitHubRepoItemApi/gitHubRepoItemApi";
import {
  GetRepositoriesType,
  GetRepositoryType,
  GetRepositoriesCountType,
} from "utils/types";
import axios from "axios";

const getAPIError = () => {
  if (HEADER_API_KEY === undefined) {
    throw new Error("Cannot find HEADER_API_KEY");
  }
};
const axiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    throw error;
  } else {
    throw new Error("unexpected");
  }
};
const getRepositories: GetRepositoriesType = async (
  pageNumber,
  perPageCount,
  organization = "ktsstudio"
) => {
  getAPIError();
  try {
    const request = await axios.get<gitHubRepoItemApi[]>(
      `${BASE_URL}/orgs/${organization}/repos?page=${pageNumber}&per_page=${perPageCount}`,
      HEADER_API_KEY
    );
    const data = await request.data;
    return data;
  } catch (error) {
    axiosError(error);
  }
};

const getRepository: GetRepositoryType = async (owner, repoName) => {
  getAPIError();
  try {
    const request = await axios.get<gitHubRepoItemApi>(
      `${BASE_URL}/repos/${owner}/${repoName}`,
      HEADER_API_KEY
    );
    const data = await request.data;
    return data;
  } catch (error) {
    axiosError(error);
  }
};

const config = {
  headers: {
    Authorization: HEADER_API_KEY,
    Accept: "application/vnd.github.raw",
  },
};
const getRepositoryReadme: GetRepositoryType = async (owner, repoName) => {
  getAPIError();
  try {
    const request = await axios.get<gitHubRepoItemApi>(
      `${BASE_URL}/repos/${owner}/${repoName}/readme`,
      config
    );
    const data = await request.data;
    return data;
  } catch (error) {
    axiosError(error);
  }
};

const getRepositoriesCount: GetRepositoriesCountType = async (
  organizationName
) => {
  getAPIError();
  try {
    const request = await axios.get(
      `${BASE_URL}/orgs/${organizationName}`,
      HEADER_API_KEY
    );
    const data = await request.data;
    return data.public_repos;
  } catch (error) {
    axiosError(error);
  }
};

export {
  getRepositories,
  getRepository,
  getRepositoriesCount,
  getRepositoryReadme,
};
