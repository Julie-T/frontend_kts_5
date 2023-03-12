import {
  gitHubRepoOwnerApi,
  gitHubRepoOwnerModel,
  normalizeGitHubRepoOwner,
} from "../gitHubRepoOwnerApi";

type gitHubRepoItemApi = {
  name: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  id: number;
  owner: gitHubRepoOwnerApi;
  private: boolean;
  full_name: string;
  topics: Array<string>;
  watchers_count: string;
  forks_count: string;
  fork: boolean;
  archive: boolean;
  mirror: boolean;
  template: boolean;
};

type gitHubRepoItemModel = {
  name: string;
  htmlUrl: string;
  stargazersCount: number;
  updatedAt: string;
  id: number;
  owner: gitHubRepoOwnerModel;
  private: boolean;
  fullName: string;
  topics: Array<string>;
  watchersCount: string;
  forksCount: string;
  fork: boolean;
  archive: boolean;
  mirror: boolean;
  template: boolean;
};

const dateOptionsType: DateType = { month: "short", day: "numeric" };
export type DateType = {
  month: "short";
  day: "numeric";
};

const normalizeGitHubRepoItem = (
  from: gitHubRepoItemApi
): gitHubRepoItemModel => ({
  htmlUrl: from.html_url,
  name: from.name,
  stargazersCount: from.stargazers_count,
  updatedAt: new Date(from.updated_at).toLocaleDateString(
    "en-GB",
    dateOptionsType
  ),
  id: from.id,
  owner: normalizeGitHubRepoOwner(from.owner),
  private: from.private,
  fullName: from.full_name,
  topics: from.topics,
  watchersCount: from.watchers_count,
  forksCount: from.forks_count,
  fork: from.fork,
  archive: from.archive,
  mirror: from.mirror,
  template: from.template,
});
export {gitHubRepoItemApi,  gitHubRepoItemModel, dateOptionsType, normalizeGitHubRepoItem}