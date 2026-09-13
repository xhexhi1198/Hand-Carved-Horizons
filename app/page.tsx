import { Hero } from "@/components/sections/Hero";
import { Reason } from "@/components/sections/Reason";
import { MembershipSection } from "@/components/membership/MembershipSection";
import { Benefits } from "@/components/sections/Benefits";
import { ExperienceTypes } from "@/components/sections/ExperienceTypes";
import { LaunchCollection } from "@/components/sections/LaunchCollection";
import { TravelPortfolio } from "@/components/sections/TravelPortfolio";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Reason />
      <MembershipSection />
      <Benefits />
      <ExperienceTypes />
      <LaunchCollection />
      <TravelPortfolio />
      <ContactCTA />
    </>
  );
}
