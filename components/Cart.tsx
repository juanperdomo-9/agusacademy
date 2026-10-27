"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { products, site } from "@/lib/content";
import { addToCart, cartCount, setQty, useCart } from "@/lib/cart";
import { checkSession, supabase } from "@/lib/session";

const money = (n: number) => n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const byId = (id: string) => products.items.find((p) => p.id === id);

export function AddToCart({ id }: { id: string }) {
  const [added, setAdded] = useState(false);
  useEffect(() => { if (!added) return; const t = setTimeout(() => setAdded(false), 1400); return () => clearTimeout(t); }, [added]);
  return (
    <button type="button" className="btn btn--ghost btn--small" onClick={() => { addToCart(id); setAdded(true); }} aria-live="polite">
      <span className="btn-label">{added ? "Agregado ✓" : "Agregar"}</span>
    </button>
  );
}

// Botón flotante del carrito + panel lateral con cantidades, entrega y finalizar compra.
// Comprar pide cuenta, igual que el curso.
export default function Cart() {
  const cart = useCart();
  const ref = useRef<HTMLDialogElement>(null);
  const [delivery, setDelivery] = useState<"retiro" | "envio">("retiro");
  const [note, setNote] = useState<string | null>(null);
  const count = cartCount(cart);
  const lines = Object.entries(cart).map(([id, qty]) => ({ p: byId(id)!, qty })).filter((l) => l.p);
  const priced = lines.every((l) => l.p.amount > 0);
  const total = lines.reduce((a, l) => a + l.p.amount * l.qty, 0);

  const open = () => { setNote(null); ref.current?.showModal(); };

  const finish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sb = supabase();
    if (!sb) { setNote("El pago online de la tienda se habilita pronto. Mientras tanto, pedí tus productos por Instagram."); return; }
    const state = await checkSession();
    if (state !== "ok") { location.assign("/crear-cuenta/?next=/tienda/"); return; }
    // TODO: crear la preferencia de Mercado Pago con los ítems y los datos de entrega.
    setNote("El pago con Mercado Pago se habilita en los próximos días. Tu carrito queda guardado.");
  };

  return (
    <>
      <button type="button" className="cart-fab" data-on={count > 0} onClick={open} aria-label={`Abrir carrito, ${count} productos`}>
        <span className="t-label">Carrito</span>
        <span className="cart-fab-n">{count}</span>
      </button>

      <dialog ref={ref} className="cart" aria-labelledby="cart-title" onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}>
        <div className="cart-inner">
          <div className="cart-head">
            <h2 id="cart-title" className="t-label">Tu carrito ({count})</h2>
            <button type="button" className="cart-close t-label" onClick={() => ref.current?.close()}>Cerrar</button>
          </div>

          {lines.length === 0 ? (
            <p className="t-note t-soft cart-empty">Todavía no agregaste productos.</p>
          ) : (
            <form className="cart-body" onSubmit={finish}>
              <ul className="cart-lines">
                {lines.map(({ p, qty }) => (
                  <li key={p.id} className="cart-line">
                    <img src={p.image} alt="" width={64} height={80} />
                    <div>
                      <p className="cart-name">{p.name}</p>
                      <p className="t-note t-soft">{p.amount ? money(p.amount) : p.price}</p>
                    </div>
                    <div className="cart-qty" role="group" aria-label={`Cantidad de ${p.name}`}>
                      <button type="button" onClick={() => setQty(p.id, qty - 1)} aria-label="Uno menos">−</button>
                      <span>{qty}</span>
                      <button type="button" onClick={() => setQty(p.id, qty + 1)} aria-label="Uno más">+</button>
                    </div>
                  </li>
                ))}
              </ul>

              <fieldset className="cart-delivery">
                <legend className="t-label">Entrega</legend>
                <label><input type="radio" name="delivery" checked={delivery === "retiro"} onChange={() => setDelivery("retiro")} /> Retiro en el local <span className="t-note t-soft">{products.pickup}</span></label>
                <label><input type="radio" name="delivery" checked={delivery === "envio"} onChange={() => setDelivery("envio")} /> Envío a domicilio <span className="t-note t-soft">{products.shippingNote}</span></label>
              </fieldset>

              {delivery === "envio" && (
                <div className="cart-address">
                  <label className="field"><span className="t-label">Nombre y apellido</span><input name="name" autoComplete="name" required /></label>
                  <label className="field"><span className="t-label">Teléfono</span><input name="phone" type="tel" autoComplete="tel" required /></label>
                  <label className="field"><span className="t-label">Dirección</span><input name="address" autoComplete="street-address" required /></label>
                  <div className="cart-row">
                    <label className="field"><span className="t-label">Ciudad</span><input name="city" autoComplete="address-level2" required /></label>
                    <label className="field"><span className="t-label">Código postal</span><input name="zip" autoComplete="postal-code" inputMode="numeric" required /></label>
                  </div>
                </div>
              )}

              <div className="cart-total">
                <span className="t-label">Total{delivery === "envio" ? " (sin envío)" : ""}</span>
                <strong>{priced ? money(total) : "[$XX.XXX]"}</strong>
              </div>
              {note && <p className="auth-msg" role="status">{note} {note.includes("Instagram") && <a href={site.instagram} target="_blank" rel="noopener noreferrer">Abrir Instagram</a>}</p>}
              <button className="btn" type="submit"><span className="btn-label">Finalizar compra</span></button>
              <p className="t-note t-soft">Para comprar necesitás una cuenta. Pagás con Mercado Pago.</p>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
