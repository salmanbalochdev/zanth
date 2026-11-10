/** Real Zanth Public School photographs, provided by the school.
 * Seven unique photographs are packed into a single lightweight WebP sprite.
 * Do not infer student identities, event dates, or awards from these photos.
 */
export const schoolPhotos = [
  { id: "school-celebration", index: 0, alt: "Zanth students taking part in a school celebration", caption: "School Celebrations" },
  { id: "student-group", index: 1, alt: "Group photograph of Zanth students outdoors", caption: "Our Students" },
  { id: "stage-celebration", index: 2, alt: "Students participating in a colorful school stage program", caption: "Student Activities" },
  { id: "stage-performance", index: 3, alt: "Students performing together on the school stage", caption: "Creative Performances" },
  { id: "stage-presentation", index: 4, alt: "Student presenting on stage during a school program", caption: "Building Confidence" },
  { id: "student-speakers", index: 5, alt: "Two students speaking at the school program podium", caption: "Student Presentations" },
  { id: "group-activity", index: 6, alt: "Students enjoying a group activity on stage", caption: "Moments at Zanth" },
] as const;
export type SchoolPhoto = (typeof schoolPhotos)[number];
export const schoolSpriteUrl = "/images/school-activities.webp";
