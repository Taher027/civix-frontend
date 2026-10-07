import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Complaint } from "@/types/complaint.type";

const priorityStyles: Record<string, string> = {
  LOW: "bg-green-100 text-green-800 border-green-200",
  MEDIUM: "bg-yellow-100 text-yellow-800 border-yellow-200",
  HIGH: "bg-red-100 text-red-800 border-red-200",
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-200",
  RESOLVED: "bg-green-100 text-green-800 border-green-200",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const label = (value: string) =>
  value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

function Field({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <dt className="text-sm text-muted-foreground">{name}</dt>
      <dd className="text-sm font-medium wrap-break-wor">{children}</dd>
    </div>
  );
}

function ImageGrid({ title, images }: { title: string; images: string[] }) {
  if (!images?.length) return null;
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <a
            key={src + i}
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg border"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} ${i + 1}`}
              className="aspect-square w-full object-cover transition-transform hover:scale-105"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default function ComplaintDetailsCard({
  complaint,
  user,
}: {
  complaint: Complaint;
  user: string;
}) {
  const {
    id,
    title,
    short_description,
    description,
    category,
    city,
    createdAt,
    createdBy,
    initialImages,
    resolvedImages,
    location,
    mapURL,
    priority,
    status,
    resolvedAt,
  } = complaint;

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={cn(statusStyles[status])}>
            {label(status)}
          </Badge>
          <Badge variant="outline" className={cn(priorityStyles[priority])}>
            {label(priority)} priority
          </Badge>
          <Badge variant="secondary">{category.title}</Badge>
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">
          {short_description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <section className="space-y-2">
          <h3 className="text-sm font-semibold">Description</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </section>

        <Separator />

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field name="Location">{location}</Field>
          <Field name="City">{label(city)}</Field>
          <Field name="Reported on">{formatDate(createdAt)}</Field>
          <Field name="Resolved on">
            {resolvedAt ? formatDate(resolvedAt) : "Not resolved yet"}
          </Field>
          <Field name="Reported by">
            <span className="font-mono text-xs">{createdBy}</span>
          </Field>
        </dl>

        <ImageGrid title="Reported photos" images={initialImages} />
        <ImageGrid title="Resolved photos" images={resolvedImages} />
      </CardContent>

      <CardFooter className="flex flex-wrap justify-between gap-3">
        {/* Link styled with buttonVariants, so no asChild is needed */}
        <a
          href={mapURL}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          View on map
        </a>

        <Link
          href={`/${user}/my-complaints/${id}/edit-complaint`}
          className={buttonVariants({ variant: "default" })}
        >
          Edit
        </Link>
      </CardFooter>
    </Card>
  );
}
