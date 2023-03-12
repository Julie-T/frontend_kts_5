import {
  gitHubRepoItemApi,
  gitHubRepoItemModel,
  normalizeGitHubRepoItem,
} from "store/models/gitHub/gitHubRepoItemApi/gitHubRepoItemApi";
import { getRepository, getRepositoryReadme } from "utils/api";
import { Meta } from "utils/meta";
import { GetRepoItemParams, IRepositoryStore } from "utils/types";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_meta" | "_repoItem" | "_repoReadme" | "_errorMessage";

class RepositoryStore implements IRepositoryStore {
  private _meta: Meta = Meta.initial;
  private _repoItem: gitHubRepoItemModel | null = null;
  private _repoReadme: string | gitHubRepoItemApi | null = null;
  private _errorMessage = "";

  constructor() {
    makeObservable<RepositoryStore, PrivateFields>(this, {
      _meta: observable,
      _repoItem: observable,
      _repoReadme: observable,
      _errorMessage: observable,
      meta: computed,
      getRepoItem: action,
      setErrorMessage: action,
    });
  }

  get repoItem(): gitHubRepoItemModel | null {
    return this._repoItem;
  }

  get repoReadme(): string | gitHubRepoItemApi | null {
    return this._repoReadme;
  }

  get meta(): Meta {
    return this._meta;
  }

  setErrorMessage = (e: string) => {
    this._errorMessage = e;
  };

  async getRepoItem(params: GetRepoItemParams) {
    this._repoItem = null;
    this._meta = Meta.loading;
    this.setErrorMessage("");
    const data = await getRepository(params.owner, params.repo);

    runInAction(() => {
      if (data) {
        try {
          this._repoItem = normalizeGitHubRepoItem(data);
          this._meta = Meta.success;
          return;
        } catch (e) {
          this._meta = Meta.error;
        }
      }
      this._meta = Meta.error;
    });
  }

  async getRepoReadme(params: GetRepoItemParams) {
    this._repoReadme = null;
    this._meta = Meta.loading;
    this.setErrorMessage("");
    const data = await getRepositoryReadme(params.owner, params.repo);

    runInAction(() => {
      if (data) {
        try {
          this._repoReadme = data;
          this._meta = Meta.success;
          return;
        } catch (e) {
          this._meta = Meta.error;
        }
      }
      this._meta = Meta.error;
    });
  }
}
export default RepositoryStore;
