const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Admin Dasboard",
    items: [
      {
        title: "Complaints Data",
        url: `${prefix}`,
      },
      {
        title: "Volunteer Application",
        url: `${prefix}/Volunteer-application`,
      },
      {
        title: "Review Submit",
        url: `${prefix}/review-submit`,
      },
    ],
  },

  {
    title: "My Information",
    items: [
      {
        title: "Profile Details",
        url: `${prefix}/profile-details`,
      },
      {
        title: "Update Profile",
        url: `${prefix}/update-profile`,
      },
    ],
  },
];
