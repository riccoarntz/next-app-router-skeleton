import { create } from 'zustand';

interface GlobalStore {
  menuIsOpen: boolean;
  setMenuOpenState: (isOpen: boolean) => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  menuIsOpen: false,

  setMenuOpenState: (isOpen) =>
    set(() => ({
      menuIsOpen: isOpen,
    })),
}));

export default useGlobalStore;
