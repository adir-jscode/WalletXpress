import WalletLogin from "@/assets/images/wallet-login.jpeg";
import Logo from "@/components/logo";
import { RegisterForm } from "@/components/modules/authentication/RegisterForm";
import { CheckCircle, TrendingUp, Users } from "lucide-react";

export default function Register() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-white dark:bg-slate-950">
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-emerald-800 dark:from-green-900 dark:to-slate-950">
        <img
          src={WalletLogin || "/placeholder.svg"}
          alt="Join our wallet community"
          className="absolute inset-0 h-full w-full object-cover opacity-40 dark:opacity-20"
        />
        <div className="relative z-10 text-center space-y-8 px-8 max-w-md">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Start Your Digital Journey
          </h2>
          <p className="text-base text-green-100">
            Join millions of users enjoying seamless digital payments with
            complete security and control.
          </p>

          {/* Benefits list */}
          <div className="space-y-4 pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
              <span className="text-left text-green-50">
                Instant account setup in under 2 minutes
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
              <span className="text-left text-green-50">
                Both personal & agent accounts available
              </span>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
              <span className="text-left text-green-50">
                Start earning with our agent program
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6 md:p-10 lg:p-12">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-sm space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Create Account
              </h1>
              <p className="text-base text-slate-500 dark:text-slate-400">
                Join our secure wallet platform in minutes
              </p>
            </div>

            {/* Form */}
            <RegisterForm />

            {/* Footer text */}
            <div className="text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <button
                onClick={() => (window.location.href = "/login")}
                className="font-semibold text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                Sign in
              </button>
            </div>

            {/* Terms */}
            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
              By creating an account, you agree to our{" "}
              <button className="underline hover:text-slate-700 dark:hover:text-slate-300">
                Terms of Service
              </button>{" "}
              and{" "}
              <button className="underline hover:text-slate-700 dark:hover:text-slate-300">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
