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
        title: "Donate History",
        url: `${prefix}`,
      },
    ],
  },
  {
    title: "App Settings",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
        isActive: true,
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
