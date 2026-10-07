import { UpdateProfileForm } from "@/components/form/updateProfileForm";
import { getMe } from "../../_Action/getme";

export default async function UpdateProfile() {
  const user = await getMe();
  return (
    <div className="flex w-full p-10">
      <div className="w-2xl mx-auto">
        <UpdateProfileForm user={user} />
      </div>
    </div>
  );
}
