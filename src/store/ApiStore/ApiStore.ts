import {
  gitHubRepoItemModel,
  normalizeGitHubRepoItem,
} from "store/models/gitHub/gitHubRepoItemApi/gitHubRepoItemApi";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "store/models/shared/collection";
import {
  getRepository,
  getRepositories,
  getRepositoriesCount,
} from "utils/api";
import { getMoreFetch } from "utils/helpers";
import { logger } from "utils/logger";
import { Meta } from "utils/meta";
import {
  GetOrganizationReposListParams,
  GetRepoItemParams,
  IApiStore,
} from "utils/types";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields =
  | "_list"
  | "_meta"
  | "_count"
  | "_hasMore"
  | "_repoItem"
  | "_searchValue"
  | "_errorMessage";

class ApiStore implements IApiStore {
  private _list: CollectionModel<number, gitHubRepoItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _count = 0;
  private _hasMore = true;
  private _page = 2;
  private _repoItem: gitHubRepoItemModel | null = null;
  private _searchValue = "";
  private _sortType = false;
  private _errorMessage = "";

  constructor() {
    makeObservable<ApiStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _count: observable,
      _hasMore: observable,
      _repoItem: observable,
      _searchValue: observable,
      _errorMessage: observable.ref,
      list: computed,
      meta: computed,
      getOrganizationReposList: action,
      getOrganizationReposCount: action,
      getRepoItem: action,
      fetchOrganizationReposList: action,
      setSearchValue: action,
      setErrorMessage: action,
      errorMessage: computed,
      repoItem: computed,
      hasMore: computed,
    });
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  get searchValue(): string {
    return this._searchValue;
  }

  get repoItem(): gitHubRepoItemModel | null {
    return this._repoItem;
  }

  get hasMore(): boolean {
    return this._hasMore;
  }

  get list(): gitHubRepoItemModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  setSearchValue = (e: string) => {
    this._searchValue = e;
  };

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

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    this.setErrorMessage("");
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();
    this._hasMore = true;
    this._page = 2;
    if (params.organizationName !== "") {
      try {
        const data = await getRepositories(
          params.pageNumber,
          params.perPageCount,
          params.organizationName
        );

        runInAction(() => {
          if (data) {
            try {
              const list: gitHubRepoItemModel[] = data.map(
                normalizeGitHubRepoItem
              );
              this._list = normalizeCollection(list, (listItem) => listItem.id);
              this._meta = Meta.success;
              return;
            } catch (e) {
              logger(e);
              this._meta = Meta.error;
              this._list = getInitialCollectionModel();
            }
          }
          this._meta = Meta.error;
        });
      } catch (e) {
        runInAction(() => {
          if (axios.isAxiosError(e)) {
            this.setErrorMessage(e.message);
            this._meta = Meta.error;
          }
          this._meta = Meta.error;
        });
      }
    }
  }

  async getOrganizationReposCount(organizationName: string): Promise<void> {
    this.setErrorMessage("");
    this._count = 0;
    this.setSearchValue(organizationName);
    this._meta = Meta.loading;
    try {
      const data = await getRepositoriesCount(organizationName);
      runInAction(() => {
        if (data) {
          this._count = data;
          this._meta = Meta.success;
          this._repoItem = null;
          return;
        }
        this._meta = Meta.error;
      });
    } catch (e) {
      runInAction(() => {
        this._meta = Meta.error;
        if (axios.isAxiosError(e)) {
          this.setErrorMessage(e.message);
          this._meta = Meta.error;
        }
      });
    }
  }

  async fetchOrganizationReposList(): Promise<void> {
    const data = await getRepositories(this._page, 20, this.searchValue);
    this.setErrorMessage("");
    runInAction(() => {
      if (data) {
        try {
          let list = data.map(normalizeGitHubRepoItem);
          const prevList = Object.values(this._list.entities).map(
            (item) => this._list.entities[item.id]
          );
          list = prevList.concat(list);
          this._list = normalizeCollection(list, (listItem) => listItem.id);
          this._hasMore = getMoreFetch(this._list.order.length, this._count);
          this._page += 1;
          return;
        } catch (e) {
          logger(e);
        }
      }
    });
    runInAction(() => {
      this._hasMore = getMoreFetch(this._list.order.length, this._count);
    });
  }
}
export default ApiStore;
