import { create } from "zustand";

type Store = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useAuthModal = create<Store>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
