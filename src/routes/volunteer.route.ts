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
        title: "Applied Complaints",
        url: `${prefix}/applied-complaints`,
      },
      {
        title: "Accepted Complaints",
        url: `${prefix}/accepted-complaints`,
      },
      {
        title: "My Resolved Complaints",
        url: `${prefix}/my-resolved-complaints`,
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
