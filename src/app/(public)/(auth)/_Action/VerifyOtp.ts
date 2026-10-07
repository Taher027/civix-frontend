export const VerifyOtp = async (payload: { email: string; otp: string }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/verify-email`,
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
          result.message ||
          "Email Verification successful. Please check your email.",
      };
    }
    return {
      success: false,
      error: result.message || "verification  failed.",
    };
  } catch (error) {
    console.error("registerAction error:", error);

    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
};
