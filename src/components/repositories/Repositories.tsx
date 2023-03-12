import React, { useCallback, useEffect } from "react";

import { BlockType } from "components/blockType";
import { GitHubError } from "components/gitHubError/GitHubError";
import { Loader } from "components/loader/Loader";
import { InitialPage } from "components/repositories/initialPage/InitialPage";
import { RepositoryCard } from "components/repositories/repositoryCard/RepositoryCard";
import { Search } from "components/search";
import { gitHubRepoItemModel } from "store/models/gitHub/gitHubRepoItemApi";
import { Meta } from "utils/meta";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

import styles from "./Repositories.module.scss";
import {RootStore} from "store/RootStore";




const Repositories: React.FC = observer(() => {
  const repositoriesStore = React.useMemo(
    () => new RootStore(),
    []
  ).queryRepositories;
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (search.get("repo") && search.get("repo") !== null) {
      repositoriesStore.getOrganizationReposCount(search.get("repo") as string);
      repositoriesStore.setSearchValue(search.get("repo") as string);
      repositoriesStore.getOrganizationReposList({
        pageNumber: 1,
        perPageCount: 20,
        organizationName: search.get("repo") as string,
      });
    }
  }, [repositoriesStore, search]);

  const handleSearchButton = useCallback(
    (organization: string) => {
      setSearch({ repo: organization });
      repositoriesStore.setSearchValue(organization);
      repositoriesStore.getOrganizationReposCount(
        repositoriesStore.searchValue
      );
      repositoriesStore.getOrganizationReposList({
        pageNumber: 1,
        perPageCount: 20,
        organizationName: repositoriesStore.searchValue,
      });
    },
    [repositoriesStore, setSearch]
  );

  if (repositoriesStore.meta === Meta.loading) {
    return (
      <div className={styles.loader_position}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.repositories_block}>
      <Search handleSearchButton={handleSearchButton} />
      {repositoriesStore.meta === Meta.error ? (
        <GitHubError errorMessage={repositoriesStore.errorMessage} />
      ) : repositoriesStore.meta === Meta.initial ? (
        <InitialPage />
      ) : (
        <InfiniteScroll
          dataLength={repositoriesStore.list.length}
          next={() => repositoriesStore.fetchOrganizationReposList()}
          hasMore={repositoriesStore.hasMore}
          loader={
            <div className={styles.loader_position}>
              <Loader />
            </div>
          }
          endMessage={<h2 className={styles.loader_position}>End</h2>}
        >
          <BlockType disabled={false} />
          {repositoriesStore.list.map(
            (repo: gitHubRepoItemModel) =>
              !repo.private && (
                <div key={repo.id}>
                  <RepositoryCard
                    avatar={repo.owner.avatarUrl}
                    title={repo.name}
                    link={repo.htmlUrl}
                    starCount={repo.stargazersCount}
                    lastUpdated={repo.updatedAt}
                    owner={repo.owner.login}
                    id={repo.id}
                  />
                </div>
              )
          )}
        </InfiniteScroll>
      )}
    </div>
  );
});

export default Repositories;
