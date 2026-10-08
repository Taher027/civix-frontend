export type ComplaintStatus =
  | "PENDING"
  | "REVIEWED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED"
  | "DELETED";

export type ComplaintApplication = {
  id: string;
  complaintId: string;
  volunteerId: string;
  status: string;
  message?: string | null;
  statusNote?: string | null;
  solutionImages?: string[];
  appliedAt: string;
  resolvedAt?: string | null;
  volunteer?: {
    id: string;
    user?: { name: string; email: string };
  };
};

export type AdminComplaint = {
  id: string;
  title?: string;
  description?: string;
  status: ComplaintStatus;
  upvotes?: number;
  images?: string[];
  createdAt: string;
  updatedAt?: string;

  complaintVolunteers?: ComplaintApplication[];
};
