"use client";

import { CircularCarousel } from "@/components/ui/circular-carousel";

const items = [
  {
    id: "1",
    title: "Healthcare Outreach",
    description: "Maternal clinics and essential medical missions across the Niger Delta.",
    tag: "Health",
  },
  {
    id: "2",
    title: "Girl-Child Education",
    description: "Scholarships, uniforms, books, and literacy mentorship programs.",
    tag: "Education",
  },
  {
    id: "3",
    title: "Youth Development",
    description: "Vocational skills, fashion academy, and technology training.",
    tag: "Youth",
  },
];

export default function CircularCarouselDemo() {
  return (
    <div className="flex min-h-[480px] w-full items-center justify-center bg-paper p-8">
      <CircularCarousel items={items} />
    </div>
  );
}
