import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReviewActions from "@/components/dashboard/admin/ReviewActions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSingleComplaint } from "@/services/getSingleComplaintDetails";
import type { Complaint } from "@/types/complaint.type";

export default async function SubmitDetailsPage({
  params,
}: {
  params: Promise<{ submitDetails: string }>;
}) {
  const { submitDetails: id } = await params;
  const res = await getSingleComplaint(id);

  if (!res.success) {
    console.error("single complaint failed:", res.error);
    notFound();
  }

  const c: Complaint = res.data;
  const submission = c.complaintVolunteers?.find(
    (v) => v.status === "SUBMITTED",
  );
  const proofImages = submission?.solutionImages ?? [];
  const canReview = c.status === "IN_PROGRESS";

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 md:p-6">
      <Link
        href="/admin/review-submit"
        className="text-sm text-primary underline"
      >
        ← Back to review list
      </Link>

      <Card>
        <CardHeader className="gap-2">
          <Badge variant="outline" className="w-fit">
            {c.status}
          </Badge>
          <CardTitle className="text-2xl">{c.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {[c.location, c.city].filter(Boolean).join(", ")}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">{c.description}</p>

          {c.initialImages?.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-medium">Original problem</h3>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {c.initialImages.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-video overflow-hidden rounded-md bg-muted"
                  >
                    <Image
                      src={src}
                      alt="Problem"
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Volunteer submission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Status note</h3>
            <p className="text-sm text-muted-foreground">
              {submission?.statusNote ?? "No note provided."}
            </p>
          </div>

          {proofImages.length > 0 ? (
            <div>
              <h3 className="mb-2 text-sm font-medium">Solution images</h3>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {proofImages.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-video overflow-hidden rounded-md bg-muted"
                  >
                    <Image
                      src={src}
                      alt="Solution proof"
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No images submitted.
            </p>
          )}

          {canReview ? (
            <ReviewActions complaintId={id} />
          ) : (
            <p className="text-sm text-muted-foreground">
              This complaint is already {c.status}.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
