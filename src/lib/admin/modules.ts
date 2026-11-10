export const modules = {
  "hero-slides": { table: "hero_slides", title: "Homepage slides", fields: ["title", "subtitle", "image_path", "cta_label", "cta_href", "sort_order", "status"], required: ["title"] },
  "homepage-sections": { table: "homepage_sections", title: "Homepage sections", fields: ["section_key", "title", "body", "sort_order", "status"], required: ["section_key"] },
  "academic-programs": { table: "academic_programs", title: "Academic programs", fields: ["slug", "title", "summary", "body", "grade_range", "image_path", "sort_order", "status"], required: ["slug", "title"] },
  "academic-departments": { table: "academic_departments", title: "Academic departments", fields: ["slug", "name", "description", "sort_order", "status"], required: ["slug", "name"] },
  "faculty": { table: "faculty_members", title: "Faculty", fields: ["slug", "full_name", "designation", "qualification", "biography", "photo_path", "sort_order", "status"], required: ["slug", "full_name"] },
  "faculty-departments": { table: "faculty_departments", title: "Faculty departments", fields: ["slug", "name", "description", "status"], required: ["slug", "name"] },
  "news": { table: "news_articles", title: "News", fields: ["slug", "title", "excerpt", "body", "category", "cover_path", "status"], required: ["slug", "title"] },
  "announcements": { table: "announcements", title: "Announcements", fields: ["slug", "title", "summary", "body", "category", "status"], required: ["slug", "title"] },
  "events": { table: "school_events", title: "Events", fields: ["slug", "title", "description", "starts_at", "ends_at", "venue", "status"], required: ["slug", "title", "starts_at", "ends_at"] },
  "facilities": { table: "facilities", title: "Facilities", fields: ["slug", "title", "description", "image_path", "sort_order", "status"], required: ["slug", "title"] },
  "activities": { table: "student_activities", title: "Activities", fields: ["slug", "title", "description", "occurred_on", "image_path", "status"], required: ["slug", "title"] },
  "achievements": { table: "achievements", title: "Achievements", fields: ["slug", "title", "description", "achieved_on", "image_path", "status"], required: ["slug", "title"] },
  "gallery-albums": { table: "gallery_albums", title: "Gallery albums", fields: ["slug", "title", "description", "cover_path", "status"], required: ["slug", "title"] },
  "downloads": { table: "downloadable_documents", title: "Downloads", fields: ["title", "description", "category", "storage_path", "mime_type", "status"], required: ["title", "storage_path", "mime_type"] },
  "faqs": { table: "faq_items", title: "FAQs", fields: ["question", "answer", "category", "sort_order", "status"], required: ["question", "answer"] },
  "policies": { table: "school_policies", title: "School policies", fields: ["slug", "title", "body", "version", "status"], required: ["slug", "title"] },
  "admissions": { table: "admission_applications", title: "Admission inquiries", fields: [], required: [] },
  "inquiries": { table: "contact_inquiries", title: "Contact inquiries", fields: [], required: [] },
} as const;
export type ModuleKey = keyof typeof modules;
export function getModule(key: string) { return Object.prototype.hasOwnProperty.call(modules, key) ? modules[key as ModuleKey] : null; }
export function modulePermission(key: string, write = false) {
  if (key === "admissions") return write ? "admissions.write" : "admissions.read";
  if (key === "inquiries") return write ? "inquiries.write" : "inquiries.read";
  return write ? "content.write" : "content.read";
}
