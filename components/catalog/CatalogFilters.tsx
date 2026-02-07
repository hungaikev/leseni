/**
 * Catalog Filters Component
 */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function CatalogFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <Card className="border-2 border-gray-200 bg-white sticky top-24">
      <CardHeader>
        <CardTitle className="text-black">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="type" className="text-black mb-2 block">Type</Label>
          <select
            id="type"
            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
            value={searchParams.get("type") || ""}
            onChange={(e) => handleFilter("type", e.target.value)}
          >
            <option value="">All Types</option>
            <option value="MUSIC">Music</option>
            <option value="FILM">Film</option>
            <option value="BOOK">Book</option>
          </select>
        </div>

        <div>
          <Label htmlFor="termType" className="text-black mb-2 block">Term Type</Label>
          <select
            id="termType"
            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
            value={searchParams.get("termType") || ""}
            onChange={(e) => handleFilter("termType", e.target.value)}
          >
            <option value="">All Terms</option>
            <option value="TERM">Term</option>
            <option value="PERPETUAL">Perpetual</option>
          </select>
        </div>

        <div>
          <Label htmlFor="sort" className="text-black mb-2 block">Sort By</Label>
          <select
            id="sort"
            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
            value={searchParams.get("sort") || "newest"}
            onChange={(e) => handleFilter("sort", e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="earnings">Highest Earnings</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
          </select>
        </div>

        <Button
          variant="outline"
          className="w-full rounded-full"
          onClick={() => router.push("/catalog")}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}
