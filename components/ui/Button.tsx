import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  onClick?: (event: MouseEvent) => void;
};

type ButtonProps = CommonProps & {
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
};

const base =
  "inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] transition-colors duration-300";

const variants = {
  primary:
    "bg-ink text-canvas px-7 py-4 hover:bg-ink-soft rounded-full",
  secondary:
    "text-ink border-b border-ink pb-1 hover:border-brass hover:text-brass",
};

/** Shared button/link primitive — no rounded-SaaS shadow cards, just clean type + hairline. */
export function Button({
  href,
  children,
  className = "",
  icon,
  variant = "primary",
  external = false,
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
      {icon}
    </Link>
  );
}
