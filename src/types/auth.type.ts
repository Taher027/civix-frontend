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
