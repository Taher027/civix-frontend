export type VolunteerApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type VolunteerApplication = {
  id: string;
  userId: string;
  bio: string;
  skills: string[];
  status: VolunteerApplicationStatus;
  appliedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  totalResolved: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
};
