/**
 * Sell Page - Creator listing flow
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Upload, Music } from "lucide-react";
import Link from "next/link";

export default function SellPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-black">Sell Your Catalog</h1>
        <div className="w-24 h-1 bg-[#D4AF37] mb-4" />
        <p className="text-xl text-gray-600 max-w-2xl">
          Monetize your royalty streams with debt-free funding. Get started in minutes.
        </p>
      </div>

      <div className="space-y-8">
        {/* Step 1: Catalog Information */}
        {step === 1 && (
          <Card className="border-2 border-gray-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                  <Music className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-black">Step 1: Catalog Information</CardTitle>
                  <CardDescription className="text-gray-600">Tell us about your catalog</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-black">Catalog Title</Label>
                <Input id="title" placeholder="e.g., My Music Catalog" className="bg-white border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-black">Description</Label>
                <textarea
                  id="description"
                  className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md bg-white"
                  placeholder="Describe your catalog, including genre, notable works, and any highlights..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artwork" className="text-black">Artwork</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#D4AF37] transition-colors">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
              </div>
              <Button
                onClick={() => setStep(2)}
                className="w-full bg-black text-white hover:bg-gray-800 rounded-full"
                size="lg"
              >
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Earnings Data */}
        {step === 2 && (
          <Card className="border-2 border-gray-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-black">Step 2: Historical Earnings</CardTitle>
                  <CardDescription className="text-gray-600">Upload your royalty statements</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="earnings" className="text-black">Upload Earnings Data</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#D4AF37] transition-colors">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">Upload CSV file with historical earnings</p>
                  <p className="text-xs text-gray-500">Minimum 12 months of data required</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-gray-300 text-black hover:bg-gray-100 rounded-full"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-black text-white hover:bg-gray-800 rounded-full"
                  size="lg"
                >
                  Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Listing Details */}
        {step === 3 && (
          <Card className="border-2 border-gray-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                  <Music className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-black">Step 3: Listing Details</CardTitle>
                  <CardDescription className="text-gray-600">Set your listing terms</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mode" className="text-black">Listing Type</Label>
                <select
                  id="mode"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                >
                  <option value="auction">Auction</option>
                  <option value="fixed">Fixed Price</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reserve" className="text-black">Reserve Price ($)</Label>
                  <Input id="reserve" type="number" placeholder="100000" className="bg-white border-gray-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyNow" className="text-black">Buy Now Price ($)</Label>
                  <Input id="buyNow" type="number" placeholder="200000" className="bg-white border-gray-300" />
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 border-gray-300 text-black hover:bg-gray-100 rounded-full"
                >
                  Back
                </Button>
                <Button
                  className="flex-1 bg-[#D4AF37] text-black hover:bg-[#B8941F] rounded-full"
                  size="lg"
                >
                  Submit for Review
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Help Section */}
      <div className="mt-16 p-8 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-2xl font-bold mb-4 text-black">Need Help?</h3>
        <p className="text-gray-600 mb-4">
          Our team is here to assist you through the listing process. Get a free estimate or speak with an advisor.
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline" className="border-gray-300 text-black hover:bg-gray-100 rounded-full">
            <Link href="/contact">Contact Support</Link>
          </Button>
          <Button asChild className="bg-black text-white hover:bg-gray-800 rounded-full">
            <Link href="/estimate">Get Free Estimate</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

