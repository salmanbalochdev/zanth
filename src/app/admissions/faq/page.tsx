import type {Metadata} from "next";import {AdmissionsShell} from "@/components/admissions/page-shell";import {FAQBrowser} from "@/components/admissions/faq-browser";
export const metadata:Metadata={title:"Admissions FAQs",description:"Answers about school admissions, eligibility, fees and documents."};
export default function FAQPage(){return <AdmissionsShell title="Admission FAQs" description="Find guidance on admission inquiries and information awaiting school verification."><FAQBrowser/></AdmissionsShell>}
