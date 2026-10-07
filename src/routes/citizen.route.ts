const prefix = "/citizen";

export const citizenRoutes = [
  {
    title: "Profile",
    items: [
      {
        title: "post Complaint",
        url: `${prefix}/post-complaint`,
      },
      {
        title: "My Complaints",
        url: `${prefix}/my-complaints`,
      },
      {
        title: "Apply Vounteer",
        url: `${prefix}/apply-volunteer`,
      },
      {
        title: "My Donation",
        url: `${prefix}/my-donation`,
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
