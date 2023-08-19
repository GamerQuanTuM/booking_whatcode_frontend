import { create } from "zustand";

interface CartItem {
  name: string;
  bigSeatsPrice?: number;
  bigSeatsQuantity?: number;
  mediumSeatsPrice?: number;
  mediumSeatsQuantity?: number;
  smallSeatsPrice?: number;
  smallSeatsQuantity?: number;
}

interface StoreState {
  cart: CartItem[];
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
}

// Load the initial state from local storage if it exists
const initialState: StoreState = localStorage.getItem("cart-state")
  ? JSON.parse(localStorage.getItem("cart-state")!)
  : {
      cart: [
        {
          bigSeatsQuantity: 0,
          bigSeatsPrice: 0,
          mediumSeatsPrice: 0,
          mediumSeatsQuantity: 0,
          smallSeatsPrice: 0,
          smallSeatsQuantity: 0,
        },
      ],
      totalPrice: 0,
      addToCart: () => {},
      removeFromCart: () => {},
    };

const useStore = create<StoreState>((set) => ({
  ...initialState,
  addToCart: (item: CartItem) =>
    set((state) => {
      const updatedCart = [...state.cart, item];
      const totalPrice = updatedCart.reduce(
        (total, item) =>
          total +
          item.bigSeatsPrice! * item.bigSeatsQuantity! +
          item.mediumSeatsPrice! * item.mediumSeatsQuantity! +
          item.smallSeatsPrice! * item.smallSeatsQuantity!,
        0
      );
      const updatedState = {
        ...state,
        cart: updatedCart,
        totalPrice,
      };
      localStorage.setItem("cart-state", JSON.stringify(updatedState));
      return updatedState;
    }),
  removeFromCart: (item: CartItem) =>
    set((state) => {
      const updatedCart = [...state.cart, item];
      const totalPrice = updatedCart.reduce(
        (total, item) =>
          total -
          item.bigSeatsPrice! * item.bigSeatsQuantity! +
          item.mediumSeatsPrice! * item.mediumSeatsQuantity! +
          item.smallSeatsPrice! * item.smallSeatsQuantity!,
        0
      );
      const updatedState = {
        ...state,
        cart: updatedCart,
        totalPrice,
      };
      localStorage.setItem("cart-state", JSON.stringify(updatedState));
      return updatedState;
    }),
}));

export default useStore;
