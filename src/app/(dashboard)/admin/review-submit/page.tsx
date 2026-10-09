import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Complaint } from "@/types/complaint.type";
import { getComplaints } from "../../volunteer/_Action/getComplaints";

export default async function ReviewSubmitPage() {
  const result = await getComplaints({ status: "IN_PROGRESS" });

  if (!result.success) {
    return <p className="text-destructive">{result.error}</p>;
  }

  const complaints: Complaint[] = Array.isArray(result.data)
    ? result.data
    : (result.data?.data ?? []);

  return (
    <div className="p-4 md:p-6">
      <h1 className="mb-4 text-xl font-semibold">
        Review Submitted Complaints
      </h1>

      {complaints.length === 0 ? (
        <p className="text-muted-foreground">Nothing to review.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {complaints.map((c) => (
            <Card key={c.id} className="flex flex-col overflow-hidden pt-0">
              {c.initialImages?.[0] && (
                <div className="relative aspect-video w-full bg-muted">
                  <Image
                    src={c.initialImages[0]}
                    alt={c.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader className="gap-2">
                <Badge variant="outline" className="w-fit">
                  {c.status}
                </Badge>
                <CardTitle className="line-clamp-2 text-base">
                  {c.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 text-sm text-muted-foreground">
                <p className="line-clamp-2">{c.short_description}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/admin/review-submit/${c.id}`}
                  className="text-sm text-primary underline"
                >
                  Review submission
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
