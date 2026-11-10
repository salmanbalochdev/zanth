import { schoolSpriteUrl } from "@/data/school-photos";

type Props = { index: number; alt: string; className?: string };

/** Displays one square photograph from the school's seven-frame WebP sprite.
 * The original uploaded images were only 206px square, so keep cards modestly sized.
 */
export function SpritePhoto({ index, alt, className = "" }: Props) {
  const safeIndex = Math.max(0, Math.min(6, Math.floor(index)));
  return (
    <div
      role="img"
      aria-label={alt}
      className={`bg-slate-200 bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url("${schoolSpriteUrl}")`,
        backgroundSize: "100% 700%",
        backgroundPosition: `center ${(safeIndex / 6) * 100}%`,
      }}
    />
  );
}
