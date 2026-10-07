import ProfileComponent from "@/components/dashboard/profileComponent";
import React from "react";
import { getMe } from "../../_Action/getme";
import { UpdateProfileForm } from "@/components/form/updateProfileForm";

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
{
  /* <div >
      <div ></div> */
}
