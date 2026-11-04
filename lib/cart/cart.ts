// EXAMPLE for a shop brief: the basket's rules as pure functions, tested in cart.test.ts.
// React reads it through lib/cart/cart-context.tsx. Delete the folder if the brief has no basket.

/** Prices are whole øre (1 kr = 100 øre), so sums never pick up floating-point errors. */
export type CartItem = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export type CartState = { items: readonly CartItem[] };

export type CartAction =
  | { type: "add"; item: Omit<CartItem, "quantity">; quantity?: number }
  | { type: "setQuantity"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "clear" };

export const MAX_QUANTITY = 99;

export const emptyCart: CartState = { items: [] };

function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 0;
  return Math.min(MAX_QUANTITY, Math.max(0, Math.floor(quantity)));
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const amount = clampQuantity(action.quantity ?? 1);
      if (amount === 0) return state;
      const existing = state.items.find((line) => line.id === action.item.id);
      if (existing) {
        return cartReducer(state, {
          type: "setQuantity",
          id: existing.id,
          quantity: existing.quantity + amount,
        });
      }
      return { items: [...state.items, { ...action.item, quantity: amount }] };
    }
    case "setQuantity": {
      const quantity = clampQuantity(action.quantity);
      if (quantity === 0) return cartReducer(state, { type: "remove", id: action.id });
      return {
        items: state.items.map((line) =>
          line.id === action.id ? { ...line, quantity } : line,
        ),
      };
    }
    case "remove":
      return { items: state.items.filter((line) => line.id !== action.id) };
    case "clear":
      return emptyCart;
  }
}

export function cartCount(state: CartState): number {
  return state.items.reduce((sum, line) => sum + line.quantity, 0);
}

/** Total in øre. */
export function cartTotal(state: CartState): number {
  return state.items.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
}

/** "2.699 kr." for whole kroner, "49,50 kr." otherwise (Danish format). */
export function formatPrice(ore: number, locale = "da-DK", currency = "DKK"): string {
  const whole = ore % 100 === 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(ore / 100);
}

/** Reads a basket saved earlier. Anything malformed (an old format, hand-edited storage) gives an empty basket. */
export function parseCart(raw: unknown): CartState {
  if (typeof raw !== "object" || raw === null || !("items" in raw)) return emptyCart;
  const { items } = raw;
  if (!Array.isArray(items)) return emptyCart;
  const valid: CartItem[] = [];
  for (const line of items as unknown[]) {
    if (typeof line !== "object" || line === null) continue;
    const { id, name, unitPrice, quantity } = line as Record<string, unknown>;
    if (typeof id !== "string" || typeof name !== "string") continue;
    if (typeof unitPrice !== "number" || !Number.isInteger(unitPrice) || unitPrice < 0) continue;
    if (typeof quantity !== "number") continue;
    const clamped = clampQuantity(quantity);
    if (clamped > 0) valid.push({ id, name, unitPrice, quantity: clamped });
  }
  return { items: valid };
}
