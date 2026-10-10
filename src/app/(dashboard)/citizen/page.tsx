import { ClipboardList, FilePlus2, Search } from "lucide-react";
import Link from "next/link";
import { getMe } from "@/app/(dashboard)/_Action/getme";

const actions = [
  {
    icon: ClipboardList,
    title: "My complaints",
    text: "Track the status of the issues you have reported.",
    href: "/citizen/my-complaints",
  },
  {
    icon: Search,
    title: "Browse complaints",
    text: "See what others have reported and upvote what matters.",
    href: "/complaints",
  },
];

function getGreeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: false,
      timeZone: "Asia/Dhaka",
    }).format(new Date()),
  );
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default async function Citizen() {
  const user = await getMe();
  const name = user?.name?.split(" ")[0];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 md:p-6">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-2xl border bg-linear-to-br from-primary/10 via-background to-background p-6 md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-medium text-primary">{getGreeting()}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
            Welcome back{name ? `, ${name}` : ""}!
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Spotted a problem in your area? Report it, and let the community and
            volunteers help get it fixed.
          </p>

          <Link
            href="/citizen/post-complaint"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-opacity hover:opacity-90"
          >
            <FilePlus2 className="size-4" />
            Report a problem
          </Link>
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid gap-4 sm:grid-cols-2">
        {actions.map(({ icon: Icon, title, text, href }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-4 rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
