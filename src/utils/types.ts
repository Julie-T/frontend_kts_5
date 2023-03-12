import { gitHubRepoItemApi } from "store/models/gitHub/gitHubRepoItemApi/gitHubRepoItemApi";
import { observable } from "mobx";

export type GetRepositoriesType = {
  (pageNumber: number, perPageCount: number, organization?: string): Promise<
    Array<gitHubRepoItemApi> | undefined
  >;
};
export type GetRepositoryType = {
  (owner: string, repoName: string): Promise<gitHubRepoItemApi | undefined>;
};

export type GetOrganizationReposListParams = {
  pageNumber: number;
  perPageCount: number;
  organizationName: string;
};

export type GetRepoItemParams = {
  owner: string;
  repo: string;
};

export type GetRepositoriesCountType = {
  (organizationName: string): Promise<never | number>;
};

export interface IRepositoryStore {
  getRepoItem(params: GetRepoItemParams): Promise<void>;
  setErrorMessage(e: string): void;
}
export interface IRepositoriesStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
  getOrganizationReposCount(organizationName: string): Promise<void>;
  getRepoItem(params: GetRepoItemParams): Promise<void>;
  fetchOrganizationReposList(): Promise<void>;
  setSearchValue(e: string): void;
  setErrorMessage(e: string): void;
}

export interface IApiStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
  getOrganizationReposCount(organizationName: string): Promise<void>;
  getRepoItem(params: GetRepoItemParams): Promise<void>;
  fetchOrganizationReposList(): Promise<void>;
  setSearchValue(e: string): void;
  setErrorMessage(e: string): void;
}
