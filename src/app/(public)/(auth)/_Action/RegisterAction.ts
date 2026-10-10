"use server";

import type { RegisterPayload, RegisterResult } from "@/types/auth.type";

export const registerAction = async (
  payload: RegisterPayload,
): Promise<RegisterResult> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (result.success) {
      return {
        success: true,
        message:
          result.message || "Registration successful. Please check your email.",
      };
    }

    return {
      success: false,
      error: result.message || "Registration failed.",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
};
