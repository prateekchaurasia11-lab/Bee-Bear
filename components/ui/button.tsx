import Link from 'next/link'
import { clsx } from 'clsx'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

const variants = {
  primary: 'bg-[var(--cocoa)] text-white border-[var(--cocoa)] hover:bg-[var(--ink)] hover:border-[var(--ink)]',
  secondary: 'bg-[var(--honey)] text-[var(--ink)] border-[var(--honey)] hover:bg-[var(--cocoa)] hover:text-white',
  ghost: 'bg-transparent text-[var(--cocoa)] border-[var(--line)] hover:border-[var(--cocoa)] hover:bg-white',
}

const baseClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 py-2 text-sm text-center font-semibold tracking-[0] transition duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--honey)] disabled:pointer-events-none disabled:opacity-50'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
  variant?: keyof typeof variants
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return <button className={clsx(baseClass, variants[variant], className)} {...props} />
}

export function LinkButton({ className, variant = 'primary', href, children, ...props }: LinkButtonProps) {
  return (
    <Link href={href} className={clsx(baseClass, variants[variant], className)} {...props}>
      {children}
    </Link>
  )
}
