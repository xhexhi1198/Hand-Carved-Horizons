import type { Metadata } from "next";
import { ExperienceTypes } from "@/components/sections/ExperienceTypes";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Experiences — Hand Carved Horizons",
  description: "The types of journeys Hand Carved Horizons curates for its members.",
};

export default function ExperiencesPage() {
  return (
    <div className="pt-24">
      <ExperienceTypes />
      <ContactCTA />
    </div>
  );
}
