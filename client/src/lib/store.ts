import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProductProps } from "../types";

interface ICartProduct extends IProductProps {
  quantity: number;
}
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  id: string;
}
interface IStore {
  // user
  currentUser: IUser | null;
  isLoading: boolean;
  getUserInfo: (uid: string) => Promise<void>;
  //cart
  cartProduct: ICartProduct[];
  addToCart: (product: IProductProps) => Promise<void>;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  resetCart: () => void;
  //favorite
  favoriteProduct: ICartProduct[];
  addToFavorite: (product: IProductProps) => Promise<void>;
  removeFromFavorite: (productId: number) => void;
  resetFavorite: () => void;
}

const customStorage = {
  setItem: <T>(name: string, value: T) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const store = create<IStore>()(
  persist(
    (set) => ({
      currentUser: null,
      isLoading: true,
      cartProduct: [],
      favoriteProduct: [],

      getUserInfo: async (uid: string) => {
        if (typeof uid !== "string") throw new Error("uid must be provided");

        if (!uid) return set({ currentUser: null, isLoading: false });

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        try {
          if (docSnap.exists()) {
            set({ currentUser: docSnap.data() as IUser, isLoading: false });
          }
        } catch (error) {
          console.log("get user info error", error);
          set({ currentUser: null, isLoading: false });
        }
      },

      addToCart: (product: IProductProps) => {
        return new Promise<void>((resolve) => {
          set((state: IStore) => {
            const existingProduct = state.cartProduct.find(
              (p) => p._id === product._id
            );

            if (existingProduct) {
              return {
                cartProduct: state.cartProduct.map((p) =>
                  p._id === product._id
                    ? { ...p, quantity: (p.quantity || 0) + 1 }
                    : p
                ),
              };
            } else {
              return {
                cartProduct: [
                  ...state.cartProduct,
                  { ...product, quantity: 1 },
                ],
              };
            }
          });
          resolve();
        });
      },
      decreaseQuantity: (productId: number) => {
        set((state: IStore) => {
          const existingProduct = state.cartProduct.find(
            (p) => p._id === productId
          );

          if (existingProduct) {
            return {
              cartProduct: state.cartProduct.map((p) =>
                p._id === productId
                  ? { ...p, quantity: Math.max(p.quantity - 1, 1) }
                  : p
              ),
            };
          } else {
            return state;
          }
        });
      },
      removeFromCart: (productId: number) => {
        set((state: IStore) => ({
          cartProduct: state.cartProduct.filter(
            (item) => item._id !== productId
          ),
        }));
      },
      resetCart: () => {
        set({ cartProduct: [] });
      },
      addToFavorite: (product: IProductProps) => {
        return new Promise<void>((resolve) => {
          set((state: IStore) => {
            const isFavorite = state.favoriteProduct.some(
              (item) => item._id === product._id
            );

            return {
              favoriteProduct: isFavorite
                ? state.favoriteProduct.filter(
                    (item) => item._id !== product._id
                  )
                : [...state.favoriteProduct, { ...product }],
            };
          });
          resolve();
        });
      },

      removeFromFavorite: (productId: number) => {
        set((state: IStore) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (p) => p._id !== productId
          ),
        }));
      },
      resetFavorite: () => {
        set({ favoriteProduct: [] });
      },
    }),
    {
      name: "supergear-storage",
      storage: customStorage,
    }
  )
);
