import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const useCartStore = create(
    persist(
        (set) => ({
        cartItems: [],

        addToCart: (product) =>
            set((state) => ({
            cartItems: [...state.cartItems, product],
        })),
        removeFromCart: (index) =>
            set((state) => ({
            cartItems: state.cartItems.filter((_, i) => i !== index),
        })),

    }),
    {name: 'cart-storage'}
    )
);

export default useCartStore;