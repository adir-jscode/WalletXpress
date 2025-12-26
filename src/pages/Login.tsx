import WalletLogin from "@/assets/images/wallet-login.jpeg";
import Logo from "@/components/logo";
import { LoginForm } from "@/components/modules/authentication/LoginForm";
import { Lock, Shield, Zap } from "lucide-react";

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-white dark:bg-slate-950">
      <div className="flex flex-col gap-6 p-6 md:p-10 lg:p-12">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-sm space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome Back
              </h1>
              <p className="text-base text-slate-500 dark:text-slate-400">
                Sign in to access your Digital Wallet
              </p>
            </div>

            {/* Form */}
            <LoginForm />

            {/* Security Features */}
            <div className="space-y-3 pt-4">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                Why you're safe with us
              </p>
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Bank-grade encryption
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    2FA & biometric security
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Instant transaction alerts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account?{" "}
          <button
            onClick={() => (window.location.href = "/register")}
            className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Create one
          </button>
        </div>
      </div>

      <div className="relative hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-slate-950">
        <img
          src={WalletLogin || "/placeholder.svg"}
          alt="Secure wallet login"
          className="absolute inset-0 h-full w-full object-cover opacity-40 dark:opacity-20"
        />
        <div className="relative z-10 text-center space-y-6 px-8 max-w-md">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Secure Banking in Your Pocket
          </h2>
          <p className="text-base text-blue-100">
            Experience fast, secure, and seamless money transfers with our
            trusted digital wallet platform.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">2.5M+</p>
              <p className="text-xs text-blue-100">Active Users</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">500K+</p>
              <p className="text-xs text-blue-100">Daily Transactions</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">$2B+</p>
              <p className="text-xs text-blue-100">Volume Processed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
