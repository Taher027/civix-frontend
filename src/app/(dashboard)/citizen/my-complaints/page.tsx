import { ComplaintCard } from "@/components/dashboard/complaint/ComplaintCard";
import type { Complaint } from "@/types/complaint.type";
import { getMe } from "../../_Action/getme";
import { myComplaints } from "../_Action/myComplaits";

export default async function MyComplaints() {
  const me = await getMe();
  const Responsecomplaints = await myComplaints();
  let complaints: Complaint[];
  if (!Responsecomplaints.success) {
    complaints = [];
    return;
  }
  complaints = Responsecomplaints.data;
  const userRole = me.role.toLowerCase();

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {complaints?.map((c: Complaint) => (
        <ComplaintCard key={c.id} complaint={c} userRole={userRole} />
      ))}
    </div>
  );
}
