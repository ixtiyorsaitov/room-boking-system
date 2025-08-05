import { IRoom } from "@/types";
import { create } from "zustand";

type Manage = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialRoom: IRoom | null;
  setInitialRoom: (room: IRoom | null) => void;
};

type Delete = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialRoom: IRoom | null;
  setInitialRoom: (room: IRoom | null) => void;
};

export const useManageRoomModal = create<Manage>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  initialRoom: null,
  setInitialRoom: (initialRoom) => set({ initialRoom }),
}));

export const useDeleteRoomModal = create<Delete>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  initialRoom: null,
  setInitialRoom: (initialRoom) => set({ initialRoom }),
}));
