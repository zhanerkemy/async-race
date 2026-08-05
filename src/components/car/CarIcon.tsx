interface CarIconProps {
  color: string;
  title?: string;
  className?: string;
}

export function CarIcon({
  color,
  title = 'Car',
  className,
}: CarIconProps) {
  return (
    <svg
      aria-label={title}
      className={className}
      role="img"
      viewBox="0 0 120 50"
    >
      <path
        d="M15 34h90l-7-18H77L66 6H39L27 16H18z"
        fill={color}
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M35 16l8-7h20l8 7z"
        fill="#b9def5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle cx="34" cy="38" fill="#111" r="8" />
      <circle cx="89" cy="38" fill="#111" r="8" />

      <circle cx="34" cy="38" fill="#aaa" r="3" />
      <circle cx="89" cy="38" fill="#aaa" r="3" />

      <circle cx="103" cy="25" fill="#fff7a8" r="3" />
    </svg>
  );
}