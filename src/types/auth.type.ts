export type userRole = "ADMIN" | "CITIZEN" | "VOLUNTEER";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};
export type RegisterResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: string;
    };
export type UserProfile = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string;
  status: string;
  phone: string;
  address: string;
  city: string;
  avatar: string | null;
  avatarPublicId?: string | null;
  authProvider: string;
  googleId?: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
export type UpdateProfileInput = {
  name: string;
  phone: string;
  city: string;
  address: string;
};
