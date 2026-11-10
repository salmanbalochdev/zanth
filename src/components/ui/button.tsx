import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
type Props = { href: string; children: React.ReactNode; variant?: "primary" | "outline" | "light"; className?: string; arrow?: boolean };
export function ActionLink({ href, children, variant = "primary", className, arrow = false }: Props) { return <Link href={href} className={cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent", variant === "primary" && "bg-secondary text-white hover:bg-[#1b735f]", variant === "outline" && "border border-white/60 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20", variant === "light" && "bg-white text-primary hover:bg-mist", className)}>{children}{arrow && <ArrowUpRight aria-hidden="true" className="h-4 w-4" />}</Link>; }
