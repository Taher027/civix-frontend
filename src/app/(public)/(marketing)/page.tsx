import { getMe } from "@/app/(dashboard)/_Action/getme";
import { allCategories } from "@/app/(dashboard)/citizen/_Action/getAllCategories";
import HeroBanner from "@/components/pages/home/Banner";
import Categories from "@/components/pages/home/Category";
import FAQ from "@/components/pages/home/FAQ";
import GetInvolved from "@/components/pages/home/GetInvolved";
import HowItWorks from "@/components/pages/home/HowItWorks";
import ResolvedShowcase from "@/components/pages/home/ResolvedShocase";
import TrendingIssues from "@/components/pages/home/TrendingIssues";

export default async function page() {
  const me = await getMe();
  const result = await allCategories();
  const categories = result.success ? result.data : [];
  const userRole = me?.role?.toLowerCase();
  return (
    <div>
      <main>
        <HeroBanner userRole={userRole} />
        <HowItWorks />
        <Categories categories={categories} />
        <TrendingIssues />
        <ResolvedShowcase />
        <GetInvolved />
        <FAQ />
      </main>
    </div>
  );
}
