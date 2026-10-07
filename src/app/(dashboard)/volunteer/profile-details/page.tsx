import ProfileComponent from "@/components/dashboard/profileComponent";
import { getMe } from "../../_Action/getme";

export default async function ProfileDetails() {
  const user = await getMe();
  return (
    <div>
      <ProfileComponent user={user} />
    </div>
  );
}
