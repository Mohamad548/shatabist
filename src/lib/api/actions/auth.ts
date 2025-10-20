import axiosInstance from "../axios";
import paths from "../end-points";
import request from "./config_server";

// export async function loginAction(data: { phoneNumber: string }) {
//   try {
//     const response = await request({
//       url: paths.auth.login,
//       method: "POST",
//       body: JSON.stringify({ phone_number: data.phoneNumber }),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || "مشکلی پیش آمده است.");
//     }

//     return { data: await response.json(), status: response.status };
//   } catch (error: any) {
//     throw new Error(error.message || "خطا در ارسال اطلاعات.");
//   }
// }

export async function loginAction(data: { phoneNumber: string }) {
  try {
    const response = await axiosInstance.post(paths.auth.login, {
      phone_number: data.phoneNumber,
    });

    return { data: response.data, status: response.status };
  } catch (error: any) {
    const message = error?.response?.data?.message || "خطا در ارسال اطلاعات.";
    throw new Error(message);
  }
}


// export async function sendOtp({
//   phoneNumber,
//   otp,
// }: {
//   phoneNumber: string;
//   otp: string;
// }) {
//   try {
//     const response = await request({
//       url: paths.auth.verify_otp,
//       method: "POST",
//       body: JSON.stringify({ phone_number: phoneNumber, otp_code: otp }),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       console.error("وضعیت ناموفق:", response.status, error);
//       throw new Error(error.message || "مشکلی پیش آمده است.");
//     }

//     return await response.json();
//   } catch (error: any) {
//     console.error("Error in sendOtp:", error.message);
//     throw new Error(error.message || "خطا در ارسال اطلاعات.");
//   }
// }

export async function sendOtp({
  phoneNumber,
  otp,
}: {
  phoneNumber: string;
  otp: string;
}) {
  try {
    const response = await axiosInstance.post(paths.auth.verify_otp, {
      phone_number: phoneNumber,
      otp_code: otp,
    });

    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || "خطا در ارسال اطلاعات.";
    throw new Error(message);
  }
}
