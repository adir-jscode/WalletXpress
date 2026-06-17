// import LoadingSpinner from "@/components/LoadingSpinner";
// import Logo from "@/components/logo";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import z from "zod";

// const forgotPasswordSchema = z.object({
//   phone: z.string().min(11, { message: "Please enter a valid phone number." }),
// });

// const resetPasswordSchema = z
//   .object({
//     otp: z
//       .string()
//       .length(6, { message: "OTP must be exactly 6 digits." })
//       .regex(/^\d+$/, { message: "OTP must contain only numbers." }),
//     newPassword: z
//       .string()
//       .min(8, { message: "Password must be at least 8 characters." })
//       .regex(/[A-Z]/, { message: "Password must contain an uppercase letter." })
//       .regex(/[0-9]/, { message: "Password must contain a number." })
//       .regex(/[!@#$%^&*]/, {
//         message: "Password must contain a special character.",
//       }),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
// type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

// export default function ForgotPassword() {
//   const navigate = useNavigate();
//   const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
//   const [loading, setLoading] = useState(false);
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [phone, setPhone] = useState("");
//   const [resendCountdown, setResendCountdown] = useState(0);

//   const phoneForm = useForm<ForgotPasswordValues>({
//     resolver: zodResolver(forgotPasswordSchema),
//   });

//   const resetForm = useForm<ResetPasswordValues>({
//     resolver: zodResolver(resetPasswordSchema),
//   });

//   useEffect(() => {
//     let interval: number | undefined;
//     if (resendCountdown > 0) {
//       interval = setInterval(() => {
//         setResendCountdown((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [resendCountdown]);

//   const onPhoneSubmit = async (values: ForgotPasswordValues) => {
//     setLoading(true);
//     try {
//       const response = await axios.post("/api/auth/forget-password", {
//         phone: values.phone,
//       });

//       if (response.data?.success) {
//         setPhone(values.phone);
//         setStep("otp");
//         setResendCountdown(60);
//         toast.success("OTP sent to your phone number.");
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message || "Failed to send OTP. Try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     setOtpLoading(true);
//     try {
//       const response = await axios.post("/api/auth/forget-password", {
//         phone,
//       });

//       if (response.data?.success) {
//         setResendCountdown(60);
//         toast.success("OTP resent successfully.");
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message || "Failed to resend OTP. Try again.",
//       );
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   const onResetSubmit = async (values: ResetPasswordValues) => {
//     setLoading(true);
//     try {
//       const response = await axios.post("/api/auth/reset-password", {
//         phone,
//         otp: values.otp,
//         newPassword: values.newPassword,
//       });

//       if (response.data?.success) {
//         setStep("success");
//         toast.success("Password reset successfully!");
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message || "Failed to reset password.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid min-h-svh lg:grid-cols-2 bg-white dark:bg-slate-950">
//       <div className="flex flex-col gap-6 p-6 md:p-10 lg:p-12">
//         <div className="flex justify-center gap-2 md:justify-start">
//           <Logo />
//         </div>

//         <div className="flex flex-1 flex-col items-center justify-center">
//           <div className="w-full max-w-sm space-y-8">
//             {step === "phone" && (
//               <>
//                 <div className="space-y-2">
//                   <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
//                     Forgot Password?
//                   </h1>
//                   <p className="text-base text-slate-500 dark:text-slate-400">
//                     Enter your phone number to reset your password
//                   </p>
//                 </div>

//                 <Form {...phoneForm}>
//                   <form
//                     onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
//                     className="space-y-4"
//                   >
//                     <FormField
//                       control={phoneForm.control}
//                       name="phone"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Phone Number</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Enter your phone number"
//                               {...field}
//                               disabled={loading}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <Button type="submit" className="w-full" disabled={loading}>
//                       {loading ? (
//                         <>
//                           <LoadingSpinner size="sm" variant="inline" />
//                         </>
//                       ) : (
//                         "Send OTP"
//                       )}
//                     </Button>
//                   </form>
//                 </Form>
//               </>
//             )}

//             {step === "otp" && (
//               <>
//                 <div className="space-y-2">
//                   <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
//                     Verify OTP
//                   </h1>
//                   <p className="text-base text-slate-500 dark:text-slate-400">
//                     Enter the 6-digit code sent to {phone}
//                   </p>
//                 </div>

//                 <Form {...resetForm}>
//                   <form
//                     onSubmit={resetForm.handleSubmit(onResetSubmit)}
//                     className="space-y-4"
//                   >
//                     <FormField
//                       control={resetForm.control}
//                       name="otp"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>OTP</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="000000"
//                               maxLength={6}
//                               {...field}
//                               disabled={loading}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={resetForm.control}
//                       name="newPassword"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>New Password</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Enter new password"
//                               type="password"
//                               {...field}
//                               disabled={loading}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={resetForm.control}
//                       name="confirmPassword"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Confirm Password</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Confirm your password"
//                               type="password"
//                               {...field}
//                               disabled={loading}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <Button type="submit" className="w-full" disabled={loading}>
//                       {loading ? (
//                         <>
//                           <LoadingSpinner size="sm" variant="inline" />
//                         </>
//                       ) : (
//                         "Reset Password"
//                       )}
//                     </Button>
//                   </form>
//                 </Form>

//                 <div className="text-center text-sm text-slate-500 dark:text-slate-400">
//                   Didn&apos;t receive the code?{" "}
//                   <button
//                     onClick={handleResendOtp}
//                     disabled={resendCountdown > 0 || otpLoading}
//                     className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {resendCountdown > 0
//                       ? `Resend in ${resendCountdown}s`
//                       : "Resend OTP"}
//                   </button>
//                 </div>
//               </>
//             )}

//             {step === "success" && (
//               <>
//                 <div className="flex flex-col items-center space-y-4">
//                   <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
//                     <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
//                   </div>
//                   <div className="space-y-2 text-center">
//                     <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
//                       Password Reset Successful!
//                     </h1>
//                     <p className="text-base text-slate-500 dark:text-slate-400">
//                       Your password has been successfully reset. You can now
//                       login with your new password.
//                     </p>
//                   </div>
//                 </div>

//                 <Button onClick={() => navigate("/login")} className="w-full">
//                   Back to Login
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="flex justify-center text-sm text-slate-500 dark:text-slate-400">
//           <button
//             onClick={() => navigate("/login")}
//             className="flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Login
//           </button>
//         </div>
//       </div>

//       <div className="relative hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-slate-950">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-40"></div>
//         <div className="relative z-10 text-center space-y-6 px-8 max-w-md">
//           <Mail className="h-16 w-16 text-white mx-auto" />
//           <h2 className="text-4xl font-bold text-white leading-tight">
//             Account Security
//           </h2>
//           <p className="text-base text-blue-100">
//             Protect your account with our secure password reset process. Your
//             security is our top priority.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
