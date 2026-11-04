// EXAMPLE: the pattern for logic in lib/: pure, typed, with its test next to it.
import { describe, expect, it } from "vitest";
import {
  MAX_QUANTITY,
  cartCount,
  cartReducer,
  cartTotal,
  emptyCart,
  formatPrice,
  parseCart,
} from "@/lib/cart/cart";

const bread = { id: "rye", name: "Rugbrød", unitPrice: 4500 };
const coffee = { id: "coffee", name: "Kaffe", unitPrice: 3950 };

describe("cartReducer", () => {
  it("adds a new line, then raises its quantity on a second add", () => {
    const once = cartReducer(emptyCart, { type: "add", item: bread });
    const twice = cartReducer(once, { type: "add", item: bread, quantity: 2 });
    expect(once.items).toEqual([{ ...bread, quantity: 1 }]);
    expect(twice.items).toEqual([{ ...bread, quantity: 3 }]);
  });

  it("removes a line when its quantity is set to zero", () => {
    const state = cartReducer(emptyCart, { type: "add", item: bread });
    expect(cartReducer(state, { type: "setQuantity", id: "rye", quantity: 0 })).toEqual(emptyCart);
  });

  it("caps quantities and ignores bad numbers", () => {
    const state = cartReducer(emptyCart, { type: "add", item: bread, quantity: 500 });
    expect(state.items[0]?.quantity).toBe(MAX_QUANTITY);
    expect(cartReducer(state, { type: "add", item: coffee, quantity: Number.NaN })).toBe(state);
  });

  it("clears", () => {
    const state = cartReducer(emptyCart, { type: "add", item: bread });
    expect(cartReducer(state, { type: "clear" })).toEqual(emptyCart);
  });
});

describe("totals", () => {
  it("counts items and sums øre exactly", () => {
    let state = cartReducer(emptyCart, { type: "add", item: bread, quantity: 2 });
    state = cartReducer(state, { type: "add", item: coffee, quantity: 3 });
    expect(cartCount(state)).toBe(5);
    expect(cartTotal(state)).toBe(2 * 4500 + 3 * 3950);
  });
});

describe("formatPrice", () => {
  // Intl puts a no-break space before "kr."; compare with plain spaces.
  const plain = (text: string) => text.replace(/\s/g, " ");

  it("drops the øre on whole kroner and keeps them otherwise", () => {
    expect(plain(formatPrice(269900))).toBe("2.699 kr.");
    expect(plain(formatPrice(3950))).toBe("39,50 kr.");
  });
});

describe("parseCart", () => {
  it("keeps valid lines and drops malformed ones", () => {
    const raw = {
      items: [
        { ...bread, quantity: 2 },
        { id: 3, name: "bad id", unitPrice: 100, quantity: 1 },
        { id: "half", name: "Half øre", unitPrice: 10.5, quantity: 1 },
        null,
      ],
    };
    expect(parseCart(raw).items).toEqual([{ ...bread, quantity: 2 }]);
  });

  it("gives an empty basket for anything else", () => {
    expect(parseCart(null)).toEqual(emptyCart);
    expect(parseCart("[]")).toEqual(emptyCart);
    expect(parseCart({ items: "nope" })).toEqual(emptyCart);
  });
});
