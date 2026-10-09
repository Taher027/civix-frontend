import { getMe } from "@/app/(dashboard)/_Action/getme";
import { allCategories } from "@/app/(dashboard)/citizen/_Action/getAllCategories";
import HeroBanner from "@/components/pages/home/Banner";
import Categories from "@/components/pages/home/Category";
import HowItWorks from "@/components/pages/home/HowItWorks";
import ResolvedShowcase from "@/components/pages/home/ResolvedShocase";
import TrendingIssues from "@/components/pages/home/TrendingIssues";

export default async function page() {
  const me = await getMe();
  const result = await allCategories();
  const categories = result.success ? result.data : [];
  const userROle = me.role.toLowerCase();
  return (
    <div>
      <main>
        <HeroBanner userRole={userROle} />
        <HowItWorks />
        <Categories categories={categories} />
        <TrendingIssues />
        <ResolvedShowcase />
      </main>
    </div>
  );
}
