import { Camera, CheckCircle2, HandHeart, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Report",
    text: "Add a photo, location and a short description of the problem.",
  },
  {
    icon: ThumbsUp,
    title: "Upvote",
    text: "The community upvotes issues so the most important ones rise to the top.",
  },
  {
    icon: HandHeart,
    title: "Volunteer",
    text: "Volunteers apply to take on a problem and fix it on the ground.",
  },
  {
    icon: CheckCircle2,
    title: "Resolved",
    text: "See before and after photos once the issue is marked resolved.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          How it works
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          From problem to solution in four steps
        </h2>
      </div>

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="relative rounded-xl border bg-card p-6">
            <span className="absolute right-5 top-5 text-3xl font-bold text-muted-foreground/20">
              0{i + 1}
            </span>
            <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
