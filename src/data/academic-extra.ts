export type CurriculumLevel = {slug:string;title:string;subjects:string[];objectives:string[]};
export type AcademicEvent = {id:string;title:string;date:string;category:"exam"|"holiday"|"activity"|"other";description:string};
export const curriculumLevels:CurriculumLevel[]=[
{slug:"early-years",title:"Early Years (illustrative)",subjects:["Early language","Number awareness","Creative expression","Social development"],objectives:["Communicate through play","Explore patterns and ideas"]},
{slug:"primary",title:"Primary (illustrative)",subjects:["Literacy","Mathematics","General science","Social studies","Arts"],objectives:["Build foundational skills","Explore through guided activities"]},
{slug:"middle",title:"Middle (illustrative)",subjects:["Languages","Mathematics","Science","Humanities","Digital literacy"],objectives:["Develop independent reasoning","Collaborate and communicate"]},
{slug:"secondary",title:"Secondary (illustrative)",subjects:["Languages","Mathematics","Sciences","Humanities"],objectives:["Strengthen subject knowledge","Prepare for future study"]}
];
export const academicEvents:AcademicEvent[]=[];
export const academicContentNotice="These are illustrative curriculum examples, not a verified school syllabus. Grade ranges, board, examinations, assessment methods, dates and resources require school approval.";
