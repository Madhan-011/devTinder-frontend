const Logo = ({
  size = 36,
  withText = true,
  className = "",
}) => (
  <span
    className={`inline-flex items-center gap-2.5 text-base-content ${className}`}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={withText ? "presentation" : "img"}
      aria-hidden={withText ? "true" : undefined}
      aria-label={withText ? undefined : "DevTinder logo"}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 19 L8 32 L20 45" />
        <path d="M44 19 L56 32 L44 45" />
      </g>

      <circle
        cx="32"
        cy="32"
        r="4.5"
        className="fill-primary"
      />
    </svg>

    {withText && (
      <span className="text-xl font-semibold tracking-tight">
        DevTinder
      </span>
    )}
  </span>
);

export default Logo;