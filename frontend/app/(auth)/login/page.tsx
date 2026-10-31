"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      login(data.access_token, data.user);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FAFAFC] p-4 lg:p-8">
      {/* Main Card */}
      <div className="bg-white w-full max-w-[1000px] h-auto lg:h-[600px] rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Soft Gradient (Visual & Branding) */}
        <div className="w-full lg:w-5/12 relative p-8 lg:p-12 flex flex-col justify-end overflow-hidden">
          {/* LOGO PLACEMENT LEFT (Desktop Only) */}
          <div className="absolute top-8 left-8 z-20 hidden lg:block">
            <Image
              src="/logo.png"
              alt="Maya"
              width={70}
              height={70}
              className="object-contain"
            />
          </div>

          {/* THE GRADIENT BACKGROUND - Soft Pastel */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#FADADD] via-[#E6D6FF] to-[#D6EAF8]">
            <div className="absolute top-[-20%] right-[-20%] w-100 h-100 bg-[#FADADD]/40 rounded-full blur-[80px] opacity-70"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-75 h-75 bg-[#E6D6FF]/40 rounded-full blur-[60px] opacity-90"></div>
            <div className="absolute top-[40%] right-[10%] w-50 h-50 bg-[#D6EAF8]/50 rounded-full blur-[60px] opacity-60"></div>
          </div>

          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 z-[1] opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            }}
          ></div>
          {/* LOGO PLACEMENT RIGHT (Mobile Only) */}
          <div className="lg:hidden flex bottom-0 justify-start items-start z-500">
            <div className="w-20 h-20">
              <Image
                src="/logo.png"
                alt="Maya"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-[#6B7280] text-sm font-medium mb-2">
              You can easily
            </p>
            <h2 className="text-[#2B2B2B] text-3xl font-semibold leading-tight">
              Get access to your personal PCOS health tracking and ML-powered
              insights
            </h2>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-7/12 bg-white p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-[400px] mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-[#2B2B2B] mb-2">
                Welcome back
              </h1>
              <p className="text-[#6B7280] text-sm">
                Please enter your details to sign in.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-rose-50/80 text-rose-600 text-sm font-medium border border-rose-200/50">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#2B2B2B] block">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-[#E5E7EB] text-[#2B2B2B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FADADD]/30 focus:border-[#FADADD] transition-all bg-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#2B2B2B] block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#E5E7EB] text-[#2B2B2B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FADADD]/30 focus:border-[#FADADD] transition-all pr-12 bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#FADADD] to-[#E6D6FF] hover:from-[#F5C8D3] hover:to-[#DCC4F0] text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-[#E6D6FF]/30 hover:shadow-[#E6D6FF]/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-[#6B7280] mt-8">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-[#E6D6FF] font-semibold hover:text-[#FADADD] transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
