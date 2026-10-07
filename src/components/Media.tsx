import Image from "next/image";

type MediaProps = {
  src: string;
  file: string;
  alt: string;
  available: boolean;
  sizes: string;
  className?: string;
  eager?: boolean;
};

/**
 * Obrázek přes next/image. Pokud soubor v /public/images chybí,
 * vykreslí jednolitou plochu #E5E2DD s názvem souboru.
 * Rodič musí mít position: relative a definovanou výšku / poměr stran.
 */
export function Media({ src, file, alt, available, sizes, className = "", eager = false }: MediaProps) {
  if (!available) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`absolute inset-0 flex items-center justify-center bg-placeholder p-4 ${className}`}
      >
        <span className="text-center text-sm tracking-wide text-ink/60">{file}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      className={`object-cover ${className}`}
    />
  );
}
