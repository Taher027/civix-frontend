export type IPostComplaint = {
  title: string;
  short_description: string;
  description?: string;
  city: string;
  address: string;
  mapURL?: string;
  initialImages: string[];
  priority: string;
};
export type Complaint = {
  id: string;
  title: string;
  short_description: string;
  description: string;
  category: { id: string; title: string };
  city: string;
  location: string;
  mapURL: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | string;
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED" | string;
  upvotes: number;
  createdBy: string;
  initialImages: string[];
  resolvedImages: string[];
  createdAt: string;
  resolvedAt: string | null;
};

export type ComplaintVolunteerStatus =
  | "APPLIED"
  | "ACCEPTED"
  | "REJECTED"
  | "RESOLVED";

export type ComplaintVolunteer = {
  id: string;
  complaintId: string;
  volunteerId: string;
  status: ComplaintVolunteerStatus;
  message: string | null;
  statusNote: string | null;
  solutionImages: string[];
  appliedAt: string;
  acceptedAt: string | null;
  resolvedAt: string | null;
  updatedAt: string;
  complaint?: Complaint;
};
export type AppliedComplaint = {
  id: string;
  complaintId: string;
  volunteerId: string;
  status: string;
  message: string;
  statusNote?: string | null;
  solutionImages?: string[];
  appliedAt: string;
  acceptedAt?: string | null;
  resolvedAt?: string | null;
  updatedAt: string;
};
