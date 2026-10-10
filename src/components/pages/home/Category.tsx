import {
  Building2,
  Droplets,
  Lightbulb,
  type LucideIcon,
  Route,
  Shapes,
  Trash2,
  TreePine,
  Zap,
} from "lucide-react";
import Link from "next/link";

export type Category = {
  id?: string;
  _id?: string;
  title: string;
};

const iconRules: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ["road", "street", "traffic", "bridge"], icon: Route },
  { keywords: ["drain", "water", "sewer", "flood"], icon: Droplets },
  { keywords: ["electric", "power", "gas"], icon: Zap },
  { keywords: ["waste", "garbage", "trash", "sanitation"], icon: Trash2 },
  { keywords: ["light"], icon: Lightbulb },
  { keywords: ["park", "tree", "environment", "garden"], icon: TreePine },
  { keywords: ["building", "construction", "housing"], icon: Building2 },
];
function getIcon(title?: string): LucideIcon {
  const t = (title ?? "").toLowerCase();
  return (
    iconRules.find((r) => r.keywords.some((k) => t.includes(k)))?.icon ?? Shapes
  );
}
export default function Categories({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Categories
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Browse issues by type
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => {
          const Icon = getIcon(cat.title);
          return (
            <Link
              key={cat.id ?? cat._id ?? cat.title}
              href={`/complaints?categoryId=${cat.id ?? cat._id}`}
              className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" />
              </span>
              <span className="text-sm font-medium">{cat.title}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
