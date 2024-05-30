import { create } from 'zustand';

interface GlobalStore {
  fromPath?: string;
  toPath?: string;
  setBeforeHistoryChangePath: (path: string, fromPath: string) => void;

  menuIsOpen: boolean;
  setMenuOpenState: (isOpen: boolean) => void;

  pageIsMounted: boolean;
  setPageIsMounted: (isMounted: boolean) => void;

  pageTransitionInCompleted: boolean;
  setPageTransitionInCompleted: (isCompleted: boolean) => void;

  coverPageWipeEffect: (show: boolean) => void;
  showPageWipeEffect: boolean;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  pageIsMounted: false,
  menuIsOpen: false,
  fromPath: undefined,
  toPath: undefined,
  pageTransitionInCompleted: false,
  showPageWipeEffect: false,
  setPageIsMounted: (isMounted) =>
    set(() => ({
      pageIsMounted: isMounted,
    })),
  setPageTransitionInCompleted: (isCompleted) =>
    set(() => ({
      pageTransitionInCompleted: isCompleted,
    })),
  setMenuOpenState: (isOpen) =>
    set(() => ({
      menuIsOpen: isOpen,
    })),
  setBeforeHistoryChangePath: (toPath, fromPath) =>
    set(() => ({
      fromPath,
      toPath,
    })),
  coverPageWipeEffect: (cover) =>
    set(() => ({
      showPageWipeEffect: cover,
    })),
}));

export default useGlobalStore;
