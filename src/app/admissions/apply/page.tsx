import type {Metadata} from "next";import {AdmissionsShell} from "@/components/admissions/page-shell";import {InquiryForm} from "@/components/admissions/inquiry-form";
export const metadata:Metadata={title:"Admission Inquiry Preview",description:"Explore a multi-step school admission inquiry demo. No data is submitted or saved."};
export default function ApplyPage(){return <AdmissionsShell title="Admission Inquiry Preview" description="Preview the four-step inquiry experience. This is not an active application service."><InquiryForm/></AdmissionsShell>}
