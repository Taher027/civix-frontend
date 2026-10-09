import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Complaint } from "@/types/complaint.type";

type Props = {
  complaint: Complaint;
};

export default function ComplaintCard({ complaint: c }: Props) {
  const cover = c.initialImages?.[0];

  return (
    <Link
      href={`/complaints/${c.id}`}
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-md">
        {cover && (
          <div className="relative aspect-video bg-muted">
            <Image
              src={cover}
              alt={c.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <CardHeader className="gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{c.status.replace("_", " ")}</Badge>
            <Badge variant="secondary">{c.priority}</Badge>
            {c.category?.title && (
              <Badge variant="secondary">{c.category.title}</Badge>
            )}
          </div>
          <CardTitle className="line-clamp-2 text-lg">{c.title}</CardTitle>
          <p className="text-xs text-muted-foreground">
            {[c.location, c.city].filter(Boolean).join(", ")}
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {c.short_description ?? c.description}
          </p>

          <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
            <span>{c.upvotes} upvotes</span>
            <span>
              {new Date(c.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                timeZone: "Asia/Dhaka",
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
