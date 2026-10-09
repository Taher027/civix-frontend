import DonationCard from "@/components/donation/DonationCard";
import { getRolePath } from "@/lib/rolePath";
import { getMyDonations } from "@/services/getMyDonation";
import { getMe } from "../../_Action/getme";

export default async function MyDonationsPage() {
  const [donations, me] = await Promise.all([getMyDonations(), getMe()]);
  const rolePath = getRolePath(me?.role);

  return (
    <div className="p-4 md:p-6">
      <h1 className="mb-4 text-xl font-semibold">My Donations</h1>

      {donations.length === 0 ? (
        <p className="text-muted-foreground">No donations yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {donations.map((d) => (
            <DonationCard
              key={d.id}
              donation={d}
              detailsHref={`/${rolePath}/my-donation/${d.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
