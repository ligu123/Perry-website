import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Perry team and help build the legal OS for private capital.",
};

const openings = [
  {
    title: "Senior Software Engineer",
    team: "Engineering",
    location: "Remote",
    description: "Build core platform features for fund formation, compliance, and document workflows.",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Remote",
    description: "Shape intuitive experiences for legal and operations teams at private capital firms.",
  },
  {
    title: "Customer Success Manager",
    team: "Go-to-market",
    location: "New York, NY",
    description: "Partner with clients to onboard, adopt, and grow their use of Perry.",
  },
];

export default function CareersPage() {
  return (
    <div className="border-t border-border/60">
      <PageHeader
        title="Careers"
        description="Join us in reimagining how private capital firms run legal operations."
      />

      <div className="mx-auto grid max-w-4xl gap-6 px-6 pb-24">
        {openings.map((role) => (
          <Card key={role.title}>
            <CardHeader>
              <p className="text-sm text-muted-foreground">
                {role.team} · {role.location}
              </p>
              <CardTitle>{role.title}</CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
