export type gitHubRepoOwnerApi = {
  avatar_url: string;
  login: string;
};

export type gitHubRepoOwnerModel = {
  avatarUrl: string;
  login: string;
};

export const normalizeGitHubRepoOwner = (
  from: gitHubRepoOwnerApi
): gitHubRepoOwnerModel => ({
  avatarUrl: from.avatar_url,
  login: from.login,
});
