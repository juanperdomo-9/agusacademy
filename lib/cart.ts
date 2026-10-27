"use client";

import { useSyncExternalStore } from "react";

// Carrito de la tienda: { idProducto: cantidad }, guardado en el navegador para que no se pierda al recargar.
type Cart = Record<string, number>;
const KEY = "ama-cart";
const listeners = new Set<() => void>();
let cart: Cart = {};
let loaded = false;

function read(): Cart {
  if (!loaded && typeof window !== "undefined") {
    loaded = true;
    try { cart = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { cart = {}; }
  }
  return cart;
}

function write(next: Cart) {
  cart = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* modo privado */ }
  listeners.forEach((l) => l());
}

const EMPTY: Cart = {};
export function useCart(): Cart {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, read, () => EMPTY);
}

export const cartCount = (c: Cart) => Object.values(c).reduce((a, b) => a + b, 0);

export function addToCart(id: string) { const c = read(); write({ ...c, [id]: (c[id] ?? 0) + 1 }); }
export function setQty(id: string, qty: number) {
  const c = { ...read() };
  if (qty <= 0) delete c[id]; else c[id] = Math.min(qty, 20);
  write(c);
}
export function clearCart() { write({}); }
