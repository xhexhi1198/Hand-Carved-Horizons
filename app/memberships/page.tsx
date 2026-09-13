import type { Metadata } from "next";
import { MembershipSection } from "@/components/membership/MembershipSection";

export const metadata: Metadata = {
  title: "Memberships — Hand Carved Horizons",
  description:
    "Explore the Family, Friends Circle, and Student membership circles at Hand Carved Horizons.",
};

export default function MembershipsPage() {
  return (
    <div className="pt-24">
      <MembershipSection />
    </div>
  );
}
