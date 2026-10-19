import { products } from "@/lib/content";

// En la home, la tienda es un aviso corto: el foco de la página es el curso.
export default function ShopTeaser() {
  return (
    <section id="productos" className="shop-teaser section wrap" aria-labelledby="shop-teaser-title">
      <div className="shop-teaser-copy">
        <h2 id="shop-teaser-title" className="t-display">También podés comprar.</h2>
        <p className="t-lead">Los productos Forma Essent que usa Agus para terminar cada corte.</p>
        <a className="btn btn--ghost" href="/tienda/" data-cursor="Tienda"><span className="btn-label">Ver la tienda</span></a>
      </div>
      <ul className="shop-teaser-row" aria-label="Productos">
        {products.items.map((p) => (
          <li key={p.id}>
            <a href={`/tienda/#${p.id}`} className="shop-teaser-item" data-cursor="Ver">
              <img src={p.image} alt={`${p.name} Forma Essent`} width={1200} height={1500} loading="lazy" />
              <span className="t-label">{p.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
