import { products } from "@/lib/content";
import { AddToCart } from "@/components/Cart";

export default function Products() {
  return (
    <section id="tienda" className="products section wrap" aria-labelledby="products-title">
      <div className="products-head">
        <h1 id="products-title" className="t-display">{products.title}</h1>
        <p className="t-lead">{products.lead}</p>
      </div>
      <ul className="products-grid">
        {products.items.map((p, i) => (
          <li key={p.id} id={p.id} className="product" data-cursor="Agregar">
            <figure className="piece product-piece">
              <div className="piece-media product-media">
                <img src={p.image} alt={`${p.name} Forma Essent`} width={1200} height={1500} loading="lazy" />
              </div>
              <figcaption className="piece-foot">
                <span className="t-label">Forma Essent</span>
                <span className="t-number">{`P${i + 1}`}</span>
              </figcaption>
            </figure>
            <div className="product-info">
              <h3 className="t-title">{p.name}</h3>
              <p className="t-note t-soft">{p.kind}</p>
              <p className="t-body">{p.text}</p>
              <p className="t-note t-soft">{p.specs.join(" · ")}</p>
              <div className="product-buy">
                <span className="t-headline">{p.price}</span>
                <AddToCart id={p.id} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
