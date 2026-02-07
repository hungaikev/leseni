/**
 * Catalog Filters Component
 */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
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
          <Label htmlFor="sort">Sort By</Label>
          <select
            id="sort"
            className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
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
          className="w-full"
          onClick={() => router.push("/catalog")}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}

