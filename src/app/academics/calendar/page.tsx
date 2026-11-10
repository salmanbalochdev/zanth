import type {Metadata} from "next";
import {Container} from "@/components/shared/container";
import {PageHero} from "@/components/shared/page-hero";
import {AcademicCalendar} from "@/components/academics/calendar";
export const metadata:Metadata={title:"Academic Calendar",description:"Browse the school calendar. Official events and dates will appear after confirmation."};
export default function CalendarPage(){return <><PageHero eyebrow="Plan your year" title="Academic Calendar" description="A navigable calendar ready for verified school events, examinations, holidays and activities." crumbs={[{label:"Academics",href:"/academics"}]}/><section className="py-20 sm:py-28"><Container><AcademicCalendar/><p className="mt-6 text-sm leading-7 text-slate-600">Calendar dates are not official until the school provides and approves its academic schedule.</p></Container></section></>}
