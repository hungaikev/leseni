"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/instant/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, BarChart3, Music, ArrowRight } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
 

type Role = "INVESTOR" | "CREATOR" | "ADMIN" | "GUEST";

type PositionRow = {
  id: string;
  asset: string;
  sharePct: number;
  costBasis: number;
  currentValue: number;
  ltmEarnings: number;
  nextPayoutDate?: string;
};

export default function DashboardPage() {
  const { isLoading, user } = db.useAuth();
  const { data: usersData } = db.useQuery({
    users: {
      $: {
        where: user ? { id: user.id } : {},
      },
    },
  });
  const [role, setRole] = useState<Role>("GUEST");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [positions, setPositions] = useState<PositionRow[]>([]);
  const [overviewKpis, setOverviewKpis] = useState<Record<string, number>>({});
  const [chartData, setChartData] = useState<Array<{ period: string; value: number }>>([]);
  const [activity, setActivity] = useState<Array<{ id: string; message: string; time: string }>>([]);

  

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const profile = usersData?.users?.[0];
      const roles: string[] | undefined = profile?.roles;
      if (user) {
        const r: Role = roles?.includes("ADMIN")
          ? "ADMIN"
          : roles?.includes("CREATOR")
          ? "CREATOR"
          : "INVESTOR";
        setRole(r);
        setActiveTab(r === "ADMIN" ? "approvals" : r === "CREATOR" ? "listings" : "portfolio");
      } else {
        setRole("GUEST");
        setActiveTab("overview");
      }
      setPositions([]);
      setOverviewKpis({ totalInvested: 0, positionsCount: 0, portfolioValue: 0, realizedReturns: 0 });
      setChartData([
        { period: "M1", value: 12000 },
        { period: "M2", value: 13500 },
        { period: "M3", value: 14200 },
        { period: "M4", value: 12800 },
        { period: "M5", value: 15000 },
        { period: "M6", value: 16000 },
      ]);
      setActivity([
        { id: "a1", message: "Outbid on Live Auction", time: "2m" },
        { id: "a2", message: "Payout credited", time: "1h" },
        { id: "a3", message: "Listing moved to review", time: "3h" },
      ]);
    }
    return () => {
      mounted = false;
    };
  }, [user, usersData]);

  const tabs = useMemo(
    () => [
      { key: "overview", label: "Overview" },
      { key: "portfolio", label: "Portfolio", allowed: ["INVESTOR", "ADMIN"] as Role[] },
      { key: "listings", label: "Listings", allowed: ["CREATOR", "ADMIN"] as Role[] },
      { key: "activity", label: "Activity" },
      { key: "cashflows", label: "Cashflows" },
      { key: "analytics", label: "Analytics" },
      { key: "settings", label: "Settings" },
      { key: "approvals", label: "Approvals", allowed: ["ADMIN"] as Role[] },
    ],
    []
  );

  const visibleTabs = tabs.filter((t) => !t.allowed || t.allowed.includes(role));

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-black">Dashboard</h1>
        <p className="text-gray-600">Role: {role}</p>
        {role === "GUEST" && (
          <div className="mt-3">
            <Button asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-3 mb-8 border-b border-gray-200">
        {visibleTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === t.key ? "text-[#D4AF37] border-b-2 border-[#D4AF37]" : "text-black"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-emerald-500">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Invested</p>
                    <p className="text-2xl font-bold text-black">
                      ${overviewKpis.totalInvested ? overviewKpis.totalInvested.toLocaleString() : 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-blue-500">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Positions</p>
                    <p className="text-2xl font-bold text-black">{overviewKpis.positionsCount || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-purple-500">
                    <Music className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Portfolio Value</p>
                    <p className="text-2xl font-bold text-black">
                      ${overviewKpis.portfolioValue ? overviewKpis.portfolioValue.toLocaleString() : 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-amber-500">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Realized Returns</p>
                    <p className="text-2xl font-bold text-black">$0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Performance</CardTitle>
              <CardDescription className="text-gray-600">Recent trend</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Recent Activity</CardTitle>
              <CardDescription className="text-gray-600">Latest events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activity.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 border rounded-md">
                    <span className="text-sm text-black">{a.message}</span>
                    <span className="text-xs text-gray-500">{a.time}</span>
                  </div>
                ))}
                {!activity.length && <p className="text-sm text-gray-600">No recent activity</p>}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Browse Catalogs</CardTitle>
                <CardDescription className="text-gray-600">Explore live listings</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="rounded-full">
                  <Link href="/catalog">
                    Browse
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Create Listing</CardTitle>
                <CardDescription className="text-gray-600">For creators</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/sell">
                    Start
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Export Statements</CardTitle>
                <CardDescription className="text-gray-600">CSV download</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="rounded-full">Export</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "portfolio" && (
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Portfolio</CardTitle>
            <CardDescription className="text-gray-600">Positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="p-3">Asset</th>
                    <th className="p-3">Share %</th>
                    <th className="p-3">Cost Basis</th>
                    <th className="p-3">Current Value</th>
                    <th className="p-3">LTM Earnings</th>
                    <th className="p-3">Next Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="p-3">{p.asset}</td>
                      <td className="p-3">{p.sharePct}%</td>
                      <td className="p-3">${p.costBasis.toLocaleString()}</td>
                      <td className="p-3">${p.currentValue.toLocaleString()}</td>
                      <td className="p-3">${p.ltmEarnings.toLocaleString()}</td>
                      <td className="p-3">{p.nextPayoutDate || "-"}</td>
                    </tr>
                  ))}
                  {!positions.length && (
                    <tr>
                      <td className="p-3 text-gray-600" colSpan={6}>
                        No positions
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "listings" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Drafts</CardTitle>
              <CardDescription className="text-gray-600">Ready to submit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <span className="text-sm text-black">Catalog draft</span>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Draft</Badge>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">In Review</CardTitle>
              <CardDescription className="text-gray-600">Awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <span className="text-sm text-black">Listing</span>
                  <Badge variant="secondary">Review</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Live</CardTitle>
              <CardDescription className="text-gray-600">Active auctions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <span className="text-sm text-black">Auction</span>
                  <Badge>Live</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Ended</CardTitle>
              <CardDescription className="text-gray-600">Closed listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <span className="text-sm text-black">Closed</span>
                  <Badge variant="outline">Ended</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "activity" && (
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Activity</CardTitle>
            <CardDescription className="text-gray-600">Timeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activity.map((a) => (
                <div key={a.id} className="flex items-center justify-between p-3 border rounded-md">
                  <span className="text-sm text-black">{a.message}</span>
                  <span className="text-xs text-gray-500">{a.time}</span>
                </div>
              ))}
              {!activity.length && <p className="text-sm text-gray-600">No activity</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "cashflows" && (
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Cashflows</CardTitle>
            <CardDescription className="text-gray-600">History and upcoming</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Coming soon</p>
          </CardContent>
        </Card>
      )}

      {activeTab === "analytics" && (
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Analytics</CardTitle>
            <CardDescription className="text-gray-600">Overview</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#D4AF37" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {activeTab === "settings" && (
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Settings</CardTitle>
            <CardDescription className="text-gray-600">Profile and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Coming soon</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Coming soon</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "approvals" && role === "ADMIN" && (
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Approvals</CardTitle>
            <CardDescription className="text-gray-600">Queue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span className="text-sm text-black">KYC review</span>
                <Button size="sm">Review</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
