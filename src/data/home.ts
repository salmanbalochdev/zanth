export const homeContent = {
  about: { eyebrow: "Welcome to our school", title: "A thoughtful place to learn and grow.", description: "This preview introduces a future school community. Official history, campus photography, mission and vision will be added after school approval.", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=85" },
  values: [
    { title: "Experienced educators", description: "Teacher qualifications and experience require verification before publishing.", icon: "users" },
    { title: "Student-centered learning", description: "A sample approach that encourages curiosity and participation.", icon: "heart" },
    { title: "Thoughtful teaching", description: "Illustrative teaching methods focused on inquiry and understanding.", icon: "book" },
    { title: "Safe school environment", description: "Safety policies and facilities will be described once confirmed.", icon: "shield" },
    { title: "Technology in learning", description: "Technology provision must be verified with the school.", icon: "laptop" },
    { title: "Character and leadership", description: "Respect, responsibility and confidence are proposed learning values.", icon: "sparkles" }
  ],
  facilities: [] as { title: string; description: string; image: string }[],
  stats: [] as { label: string; value: number; suffix?: string }[],
  announcements: [] as { title: string; date: string; href: string }[],
  news: [] as { slug: string; title: string; description: string; date: string; category: string; image: string }[],
  events: [] as { slug: string; title: string; date: string; time: string; location: string }[],
  testimonials: [] as { name: string; role: string; quote: string; image?: string }[],
  gallery: [
    { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85", alt: "Illustrative image of students in a classroom" },
    { src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85", alt: "Illustrative image of a library" },
    { src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85", alt: "Illustrative image of a science laboratory" },
    { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85", alt: "Illustrative image of students at a school" }
  ]
};
