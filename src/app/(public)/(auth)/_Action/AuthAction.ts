"use server";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

type TData = {
  email: string;
  password: string;
};

export const loginAction = async (data: TData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    },
  );

  const result = await res.json();
  console.log(Response);

  if (!result.success) {
    return { success: false, error: result.message || "Login failed" };
  }

  const cookieStore = await cookies();
  cookieStore.set("accessToken", result.data?.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
  cookieStore.set("refreshToken", result.data?.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  const decodedToken = jwt.decode(result?.data?.accessToken) as JwtPayload;

  return {
    success: true,
    user: result.data,
    role: decodedToken?.role,
  };
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};
