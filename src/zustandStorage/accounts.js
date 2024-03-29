import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const accountsStore = (set) => ({
  accounts: [],
  addaccount: (account) => {
    set((state) => ({
      accounts: [account, ...state.accounts],
    }));
  },
});

const useAccountStore = create(
  devtools(persist(accountsStore, { name: "accounts" }))
);

export default useAccountStore;
