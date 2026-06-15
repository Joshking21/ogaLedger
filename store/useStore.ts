import { create } from "zustand";

// 1. Define the structural shape of your store's state and actions
interface ProfileState {
  name: string | null;
  shopName: string | null;
  setName: (newName: string) => void;
  setShopName: (newShopName: string) => void;
  profileUrl: string | null;
  setProfileUrl: (newProfileUrl: string) => void;
}

// 2. Pass the interface type to the create function
const useStore = create<ProfileState>((set) => ({
  name: "",
  shopName: "",
  profileUrl: "",
  setName: (newName) => set({ name: newName }),
  setShopName: (newShopName) => set({ shopName: newShopName }),
  setProfileUrl: (newProfileUrl) => set({ profileUrl: newProfileUrl }),
}));

// 3. Define the explicit tuple return type for your custom hook
type UseProfileReturn = [
  { name: string | null; shopName: string | null; profileUrl: string | null },
  {
    setName: (newName: string) => void;
    setShopName: (newShopName: string) => void;
    setProfileUrl: (newProfileUrl: string) => void;
    // setProfileUrl:(newProfileUrl:string)=> void;
  },
];

export function useProfile(): UseProfileReturn {
  const state = useStore();
  return [
    {
      name: state.name,
      shopName: state.shopName,
      profileUrl: state.profileUrl,
    },
    {
      setName: state.setName,
      setShopName: state.setShopName,
      setProfileUrl: state.setProfileUrl,
    },
  ];
}
