import { offerFacts } from "@/lib/content";

export default function OfferFacts() {
  return (
    <ul className="facts" aria-label="Qué incluye">
      {offerFacts.map((f) => <li key={f}>{f}</li>)}
    </ul>
  );
}
