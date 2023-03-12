import RepositoriesStore from "store/RepositoriesStore";
import RepositoryStore from "store/RepositoryStore";
import { ILocalStore } from "utils/UseLocalStore";

class RootStore {
  // implements ILocalStore
  // private callback: null | (()=> void) = null;
  //
  // private initialRepositoryStore () {
  //   if(this.callback !== null) {
  //     return new RepositoryStore();
  //   }
  // }
  // private initialRepositoriesStore () {
  //   if(this.callback !== null) {
  //     return new RepositoriesStore();
  //   }
  // }

  // readonly queryRepository = this.initialRepositoryStore();
  // readonly queryRepositories = this.initialRepositoriesStore();
  // destroy(): void {
  //   this.callback = null;
  // }
  readonly queryRepository = new RepositoryStore();
  readonly queryRepositories = new RepositoriesStore();
}
export {RootStore};
