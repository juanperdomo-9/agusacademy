import AutoVideo from "@/components/AutoVideo";

type Props = {
  n: string;
  name?: string;
  note?: string;
  src?: string;
  alt?: string;
  focus?: string; // object-position del encuadre
  parallax?: number; // velocidad de parallax de la imagen (ej. 0.06)
  video?: { src: string; start?: number; end?: number }; // clip mudo en loop; `src` queda como póster
  placeholder?: string;
  tall?: boolean;
  ratio?: string; // aspect-ratio propio de la foto (ej. "3 / 2")
  priority?: boolean;
  className?: string;
};

// Pieza numerada: una copia fotográfica con borde hueso.
// Sin `src` muestra un espacio reservado con el texto de `placeholder`.
export default function Piece({ n, name, note, src, alt = "", focus, parallax, video, placeholder, tall, ratio, priority, className = "" }: Props) {
  return (
    <figure className={`piece ${className}`}>
      <div className={`piece-media ${tall ? "piece-media--tall" : ""}`} style={ratio ? { aspectRatio: ratio } : undefined}>
        {video && src ? (
          <AutoVideo src={video.src} poster={src} focus={focus} start={video.start} end={video.end} />
        ) : src ? (
          <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} style={focus ? { objectPosition: focus } : undefined} data-parallax={parallax} />
        ) : (
          <span className="t-label">{placeholder}</span>
        )}
      </div>
      <figcaption className="piece-foot">
        <span>
          {name && <span className="t-label" style={{ display: "block" }}>{name}</span>}
          {note && <span className="t-note t-soft" style={{ display: "block" }}>{note}</span>}
        </span>
        <span className="t-number">{n}</span>
      </figcaption>
    </figure>
  );
}
