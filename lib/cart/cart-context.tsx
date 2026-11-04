"use client";

// EXAMPLE for a shop brief: one shared basket for the whole app, so the header count, the drawer and the
// checkout button always agree. It survives a reload (localStorage) and stays in step across tabs.
// Use: wrap the app in <CartProvider> (components/providers.tsx), then call useCart() in any client component.

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  cartCount,
  cartReducer,
  cartTotal,
  emptyCart,
  parseCart,
  type CartAction,
  type CartItem,
  type CartState,
} from "@/lib/cart/cart";

type CartStore = {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => CartState;
  dispatch: (action: CartAction) => void;
};

function createCartStore(storageKey: string): CartStore {
  let state: CartState | null = null; // read from storage the first time the browser asks
  const listeners = new Set<() => void>();

  function read(): CartState {
    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved ? parseCart(JSON.parse(saved)) : emptyCart;
    } catch {
      return emptyCart; // storage blocked (some private modes) or not valid JSON
    }
  }

  function getSnapshot(): CartState {
    state ??= read();
    return state;
  }

  function emit() {
    for (const listener of listeners) listener();
  }

  // Another tab changed the basket.
  function onStorage(event: StorageEvent) {
    if (event.key !== null && event.key !== storageKey) return;
    state = read();
    emit();
  }

  return {
    subscribe(listener) {
      listeners.add(listener);
      if (listeners.size === 1) window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) window.removeEventListener("storage", onStorage);
      };
    },
    getSnapshot,
    dispatch(action) {
      const next = cartReducer(getSnapshot(), action);
      if (next === state) return;
      state = next;
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Can't save (storage full or blocked): the basket still works until the page closes.
      }
      emit();
    },
  };
}

const CartContext = createContext<CartStore | null>(null);

export function CartProvider({ children, storageKey = "cart" }: { children: ReactNode; storageKey?: string }) {
  // One store per provider, made on first render, so nothing is shared between visitors on the server.
  const [store] = useState(() => createCartStore(storageKey));
  return <CartContext value={store}>{children}</CartContext>;
}

const noSubscribe = () => () => {};

export function useCart() {
  const store = useContext(CartContext);
  if (!store) throw new Error("useCart needs <CartProvider> above it (see components/providers.tsx).");

  // The server and the first browser render both see an empty basket, then the saved one, with no hydration mismatch.
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, () => emptyCart);
  // False until the saved basket has been read, so a count can wait instead of flashing 0.
  const ready = useSyncExternalStore(noSubscribe, () => true, () => false);

  return {
    items: state.items,
    count: cartCount(state),
    total: cartTotal(state),
    ready,
    add: (item: Omit<CartItem, "quantity">, quantity = 1) => store.dispatch({ type: "add", item, quantity }),
    setQuantity: (id: string, quantity: number) => store.dispatch({ type: "setQuantity", id, quantity }),
    remove: (id: string) => store.dispatch({ type: "remove", id }),
    clear: () => store.dispatch({ type: "clear" }),
  };
}
