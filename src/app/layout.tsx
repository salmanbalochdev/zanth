import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { school } from "@/data/site";
import { getSchoolLogoPath } from "@/lib/school-branding";
import { publicMediaUrl } from "@/lib/public-media-url";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
export const metadata: Metadata = { title: { default: `${school.name} | Let\'s Educate`, template: `%s | ${school.name}` }, description: "Zanth Public School Jusak, Turbat, Kech, Balochistan. Let\'s Educate.", robots: { index: false, follow: false }, openGraph: { type: "website", title: school.name, description: "Zanth Public School Jusak — Let\'s Educate." } };
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { const logoUrl = publicMediaUrl(await getSchoolLogoPath()); return <html lang="en"><body className={`${inter.variable} ${jakarta.variable} font-body antialiased`}><a href="#main-content" className="sr-only z-[100] rounded bg-white p-3 text-primary focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to main content</a><Header logoUrl={logoUrl}/><main id="main-content">{children}</main><Footer logoUrl={logoUrl}/></body></html>; }
