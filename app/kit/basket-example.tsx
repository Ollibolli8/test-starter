"use client";

// EXAMPLE: lib/cart in use, with every state: loading, empty, filled, the quantity limit.
import { AnimatePresence, motion } from "motion/react";
import { CartProvider, useCart } from "@/lib/cart/cart-context";
import { MAX_QUANTITY, formatPrice } from "@/lib/cart/cart";

const products = [
  { id: "rye", name: "Rugbrød", unitPrice: 4500 },
  { id: "coffee", name: "Kaffe", unitPrice: 3950 },
  { id: "bun", name: "Kanelsnegl", unitPrice: 3200 },
] as const;

const stepButton =
  "inline-flex size-11 items-center justify-center rounded-md border border-border text-base transition-colors duration-150 hover:bg-foreground/5 disabled:cursor-not-allowed disabled:text-muted disabled:hover:bg-transparent motion-reduce:transition-none";

export function BasketExample() {
  return (
    <CartProvider storageKey="kit-cart">
      <Basket />
    </CartProvider>
  );
}

function Basket() {
  const { items, count, total, ready, add, setQuantity, remove, clear } = useCart();

  return (
    <section aria-labelledby="basket" className="flex flex-col gap-6 border-t border-border pt-8">
      <div className="flex flex-col gap-2">
        <h2 id="basket" className="text-2xl font-semibold tracking-tight">
          Basket
        </h2>
        <p className="max-w-prose text-muted">
          The cart example from <code className="font-mono text-sm">lib/cart</code>. It is saved in this browser
          and stays in step across tabs.
        </p>
      </div>

      <ul className="flex flex-col divide-y divide-border border-y border-border">
        {products.map((product) => (
          <li key={product.id} className="flex items-center justify-between gap-4 py-3">
            <span className="flex flex-col">
              <span className="font-medium">{product.name}</span>
              <span className="text-sm text-muted tabular-nums">{formatPrice(product.unitPrice)}</span>
            </span>
            <button
              type="button"
              onClick={() => add(product)}
              className="inline-flex min-h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground transition-[opacity,scale] duration-150 ease-out-soft hover:opacity-90 active:scale-[0.98] motion-reduce:transition-none"
            >
              Add<span className="sr-only"> {product.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4 rounded-md border border-border p-4 sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-semibold">In the basket</h3>
          {/* Announced to screen readers when it changes; empty until the saved basket is read, so it never flashes 0. */}
          <span role="status" className="text-sm text-muted tabular-nums">
            {ready ? `${count} ${count === 1 ? "item" : "items"}` : ""}
          </span>
        </div>

        {ready && items.length === 0 ? (
          <p className="text-muted">Nothing here yet. Add something above.</p>
        ) : null}

        <ul className="flex flex-col">
          <AnimatePresence initial={false}>
            {items.map((line) => (
              <motion.li
                key={line.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-3 last:border-b-0"
              >
                <span className="font-medium">{line.name}</span>
                <span className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(line.id, line.quantity - 1)}
                    aria-label={`One less ${line.name}`}
                    className={stepButton}
                  >
                    −
                  </button>
                  <span className="w-8 text-center tabular-nums">{line.quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(line.id, line.quantity + 1)}
                    disabled={line.quantity >= MAX_QUANTITY}
                    aria-label={`One more ${line.name}`}
                    className={stepButton}
                  >
                    +
                  </button>
                  <span className="w-24 text-right tabular-nums">
                    {formatPrice(line.unitPrice * line.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(line.id)}
                    className="min-h-11 rounded-sm px-2 text-sm text-muted underline underline-offset-4 hover:text-foreground"
                  >
                    Remove<span className="sr-only"> {line.name}</span>
                  </button>
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {items.length > 0 ? (
          <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
            <button
              type="button"
              onClick={clear}
              className="min-h-11 rounded-sm text-sm text-muted underline underline-offset-4 hover:text-foreground"
            >
              Empty the basket
            </button>
            <p className="text-lg font-semibold tabular-nums">
              <span className="sr-only">Total </span>
              {formatPrice(total)}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
