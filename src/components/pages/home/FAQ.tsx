import { ChevronDown, CircleHelp } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "Who can report a problem?",
    a: "Anyone with a citizen account can report an issue by adding a title, description, photos and location.",
  },
  {
    q: "What happens after I submit a complaint?",
    a: "It appears publicly as pending. Other users can upvote it, and volunteers can apply to resolve it.",
  },
  {
    q: "How do I know a problem was actually fixed?",
    a: "When a complaint is resolved, the volunteer uploads resolved photos that appear next to the original problem photos.",
  },
  {
    q: "Can I become a volunteer?",
    a: "Yes. Register as a volunteer, browse pending complaints and apply to the ones you can help with.",
  },
  {
    q: "Do I need an account to browse complaints?",
    a: "No. Anyone can view complaints. An account is only needed to report, upvote or volunteer.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:px-6 md:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CircleHelp className="size-6" />
          </span>
          <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-primary">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know about reporting, volunteering and
            tracking issues on the platform.
          </p>
          <Link
            href="/complaints"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-md border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Browse complaints
          </Link>
        </div>

        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-xl border bg-card px-5 py-4 transition-shadow open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                {q}
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-open:bg-primary group-open:text-primary-foreground">
                  <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
