/**
 * Sign Up Page with Magic Code Authentication
 */

"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, ArrowRight, Loader2, CheckCircle2, User } from "lucide-react";
import { sendMagicCode, verifyMagicCode } from "@/lib/instant/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"info" | "code">("info");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSendCode = async () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await sendMagicCode(email);
      if (result.success) {
        setStep("code");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || "Failed to send magic code");
      }
    });
  };

  const handleVerifyCode = async () => {
    if (!code || code.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await verifyMagicCode(email, code);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error || "Invalid code. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">Join Leseni</CardTitle>
            <CardDescription>
              {step === "info"
                ? "Create your account to start trading royalty streams"
                : "Enter the 6-digit code sent to your email"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && step === "code" && (
              <Alert className="border-emerald-500 bg-emerald-50 dark:bg-emerald-950">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-800 dark:text-emerald-200">
                  Magic code sent! Check your email.
                </AlertDescription>
              </Alert>
            )}

            {step === "info" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
                      className="pl-10"
                      disabled={isPending}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
                      className="pl-10"
                      disabled={isPending}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSendCode}
                  disabled={isPending || !name || !email}
                  className="w-full"
                  size="lg"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Magic Code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Magic Code</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setCode(value);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
                    className="text-center text-2xl tracking-widest font-mono"
                    maxLength={6}
                    disabled={isPending}
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Enter the 6-digit code sent to {email}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep("info");
                      setCode("");
                      setError(null);
                    }}
                    className="flex-1"
                    disabled={isPending}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleVerifyCode}
                    disabled={isPending || code.length !== 6}
                    className="flex-1"
                    size="lg"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  onClick={handleSendCode}
                  disabled={isPending}
                  className="w-full text-sm"
                >
                  Resend Code
                </Button>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Already have an account?</span>
              </div>
            </div>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already registered? </span>
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
