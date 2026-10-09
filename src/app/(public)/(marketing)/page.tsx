import { getMe } from "@/app/(dashboard)/_Action/getme";
import HeroBanner from "@/components/pages/home/Banner";

export default async function page() {
  const me = await getMe();
  const userROle = me.role.toLowerCase();
  return (
    <div>
      <main>
        <HeroBanner userRole={userROle} />
      </main>
    </div>
  );
}
