export interface UnoptimizedImageProps {
  className?: string | undefined;
  src: string;
  alt: string;
  width: number;
  height: number;
  eager?: boolean;
}

export function UnoptimizedImage({
  className,
  src,
  alt,
  width,
  height,
  eager,
}: UnoptimizedImageProps) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
    />
  );
}
