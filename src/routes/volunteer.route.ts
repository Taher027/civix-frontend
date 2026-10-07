const prefix = "/volunteer";

export const volunteerRoutes = [
  {
    title: "Bookings",
    items: [
      {
        title: "Complaints",
        url: `${prefix}/complaints`,
      },
      {
        title: "Donate History",
        url: `${prefix}`,
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
