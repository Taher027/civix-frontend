import "server-only";
import { cookies } from "next/headers";
import { unstable_rethrow } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

type ServerFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  tags?: string[];
};

export type ApiResult<T = any> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string };

export async function serverFetch<T = any>(
  endpoint: string,
  { body, tags, headers, ...options }: ServerFetchOptions = {},
): Promise<ApiResult<T>> {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const isFormData = body instanceof FormData;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...(accessToken && { Cookie: `accessToken=${accessToken}` }),
        ...headers,
      },
      body:
        body === undefined
          ? undefined
          : isFormData
            ? body
            : JSON.stringify(body),
      next: tags ? { tags } : undefined,
    });

    const result = await res.json().catch(() => null);

    if (!res.ok || !result?.success) {
      return {
        success: false,
        error: result?.message || `Request failed (${res.status})`,
      };
    }

    return { success: true, data: result.data, message: result.message };
  } catch (error) {
    unstable_rethrow(error);

    return { success: false, error: "Something went wrong. Please try again." };
  }
}
