import Image from "next/image";
import { getComplaints } from "@/app/(dashboard)/volunteer/_Action/getComplaints";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Complaint } from "@/types/complaint.type";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ searchTerm?: string }>;
}) {
  const { searchTerm } = await searchParams;
  const result = await getComplaints({ searchTerm });

  if (!result.success) {
    return <p className="p-6 text-destructive">{result.error}</p>;
  }

  const complaints: Complaint[] = Array.isArray(result.data)
    ? result.data
    : (result.data?.data ?? []);

  return (
    <div className="mx-auto w-full max-w-7xl p-4 md:p-6">
      <h1 className="mb-4 text-xl font-semibold">
        {searchTerm ? `Results for "${searchTerm}"` : "All Complaints"}
      </h1>

      {complaints.length === 0 ? (
        <p className="text-muted-foreground">No complaints found.</p>
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
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p className="line-clamp-2">{c.short_description}</p>
                <p className="truncate text-xs">
                  {[c.location, c.city].filter(Boolean).join(", ")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
