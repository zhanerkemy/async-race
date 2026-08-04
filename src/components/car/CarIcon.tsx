interface CarIconProps {
  color: string;
  title?: string;
}

export function CarIcon({
  color,
  title = 'Car',
}: CarIconProps) {
  return (
    <svg
      aria-label={title}
      height="32"
      role="img"
      viewBox="0 0 120 50"
      width="72"
    >
      <path
        d="M16 34h88l-7-18H76L65 6H38L27 16H18z"
        fill={color}
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle cx="34" cy="38" fill="#111" r="8" />
      <circle cx="88" cy="38" fill="#111" r="8" />

      <circle cx="34" cy="38" fill="#aaa" r="3" />
      <circle cx="88" cy="38" fill="#aaa" r="3" />
    </svg>
  );
}