import { IBooking } from "@/types";
import { create } from "zustand";

type Store = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialBooking: IBooking | null;
  setInitialBooking: (room: IBooking | null) => void;
};

export const useDeleteBooking = create<Store>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  initialBooking: null,
  setInitialBooking: (initialBooking) => set({ initialBooking }),
}));
