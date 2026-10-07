import ProfileComponent from "@/components/dashboard/profileComponent";
import React from "react";
import { getMe } from "../../_Action/getme";
import { UpdateProfileForm } from "@/components/form/updateProfileForm";

export default async function UpdateProfile() {
  const user = await getMe();
  return (
    <div>
      <UpdateProfileForm user={user} />
    </div>
  );
}
