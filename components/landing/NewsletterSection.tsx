"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!interest) {
      setError("Please select your primary interest");
      return;
    }

    setError(null);
    startTransition(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setEmail("");
      setInterest("");
      setTimeout(() => setSuccess(false), 5000);
    });
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-2 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mb-2">Get Deal Updates</CardTitle>
              <CardDescription className="text-lg">
                Sign up to get notified of every deal that comes on the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-emerald-500 bg-emerald-50 dark:bg-emerald-950">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <AlertDescription className="text-emerald-800 dark:text-emerald-200">
                      Thank you! Your submission has been received. You'll receive an email when new deals are available.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="newsletter-email">Email</Label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isPending || success}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newsletter-interest">I'm primarily interested in...</Label>
                  <Select value={interest} onValueChange={setInterest} disabled={isPending || success}>
                    <SelectTrigger id="newsletter-interest">
                      <SelectValue placeholder="Select one..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investing">Investing</SelectItem>
                      <SelectItem value="raising">Raising Money</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isPending || success || !email || !interest}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : success ? (
                    "Subscribed!"
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By clicking Sign Up you're confirming that you agree with our Terms and Conditions.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

