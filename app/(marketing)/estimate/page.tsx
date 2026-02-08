 "use client";
 
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import Link from "next/link";
 import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
   PieChart,
   Pie,
   Cell,
   Legend,
 } from "recharts";
 
 const monthlyData = [
   { month: "Jan", earnings: 12000 },
   { month: "Feb", earnings: 13500 },
   { month: "Mar", earnings: 14200 },
   { month: "Apr", earnings: 12800 },
   { month: "May", earnings: 15000 },
   { month: "Jun", earnings: 16000 },
   { month: "Jul", earnings: 15800 },
   { month: "Aug", earnings: 17000 },
   { month: "Sep", earnings: 16500 },
   { month: "Oct", earnings: 17200 },
   { month: "Nov", earnings: 16800 },
   { month: "Dec", earnings: 18000 },
 ];
 
 const revenueBreakdown = [
   { name: "Streaming", value: 62 },
   { name: "Publishing", value: 18 },
   { name: "Sync", value: 12 },
   { name: "Other", value: 8 },
 ];
 
 const COLORS = ["#D4AF37", "#8F6A00", "#B8941F", "#E5C96E"];
 
 export default function EstimatePage() {
   return (
     <div className="container mx-auto px-4 py-12 max-w-7xl">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
           <Card className="border-2 border-gray-200 bg-white">
             <CardHeader>
               <div className="flex items-start justify-between">
                 <div>
                   <CardTitle className="text-3xl text-black">Asset Detail</CardTitle>
                   <CardDescription className="text-gray-600">
                     Estimated performance overview based on historical royalty data
                   </CardDescription>
                 </div>
                 <Badge variant="secondary">Life of Rights</Badge>
               </div>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 <div>
                   <div className="text-sm text-gray-600 mb-1">Trailing 12M Earnings</div>
                   <div className="text-2xl font-bold text-black">$182,400</div>
                 </div>
                 <div>
                   <div className="text-sm text-gray-600 mb-1">Avg Annual Earnings</div>
                   <div className="text-2xl font-bold text-black">$152,300</div>
                 </div>
                 <div>
                   <div className="text-sm text-gray-600 mb-1">Streams (LTM)</div>
                   <div className="text-2xl font-bold text-black">82.4M</div>
                 </div>
                 <div>
                   <div className="text-sm text-gray-600 mb-1">Term</div>
                   <div className="text-2xl font-bold text-black">Perpetual</div>
                 </div>
               </div>
             </CardContent>
           </Card>
 
           <Card className="border-2 border-gray-200 bg-white">
             <CardHeader>
               <CardTitle className="text-black">Monthly Earnings</CardTitle>
               <CardDescription className="text-gray-600">Last 12 months</CardDescription>
             </CardHeader>
             <CardContent className="h-72">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={monthlyData}>
                   <XAxis dataKey="month" />
                   <YAxis />
                   <Tooltip />
                   <Bar dataKey="earnings" fill="#D4AF37" />
                 </BarChart>
               </ResponsiveContainer>
             </CardContent>
           </Card>
 
           <Card className="border-2 border-gray-200 bg-white">
             <CardHeader>
               <CardTitle className="text-black">Revenue Breakdown</CardTitle>
               <CardDescription className="text-gray-600">Share of sources</CardDescription>
             </CardHeader>
             <CardContent className="h-72">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie data={revenueBreakdown} dataKey="value" nameKey="name" outerRadius={120} label>
                     {revenueBreakdown.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Legend />
                   <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
             </CardContent>
           </Card>
         </div>
 
         <div className="space-y-8">
           <Card className="border-2 border-gray-200 bg-white">
             <CardHeader>
               <CardTitle className="text-black">Summary</CardTitle>
               <CardDescription className="text-gray-600">
                 Key highlights and assumptions
               </CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="space-y-2">
                 <div className="text-sm text-gray-600">Rights Type</div>
                 <div className="text-lg font-semibold text-black">Publishing Royalties</div>
               </div>
               <div className="space-y-2">
                 <div className="text-sm text-gray-600">Geographies</div>
                 <div className="text-lg font-semibold text-black">Global</div>
               </div>
               <div className="space-y-2">
                 <div className="text-sm text-gray-600">Distribution</div>
                 <div className="text-lg font-semibold text-black">Quarterly</div>
               </div>
               <Button asChild className="w-full rounded-full">
                 <Link href="/sell">Submit Your Catalog</Link>
               </Button>
             </CardContent>
           </Card>
 
           <Card className="border-2 border-gray-200 bg-white">
             <CardHeader>
               <CardTitle className="text-black">Learn More</CardTitle>
               <CardDescription className="text-gray-600">
                 Explore how listings and auctions work
               </CardDescription>
             </CardHeader>
             <CardContent className="space-y-3">
               <Button asChild variant="outline" className="w-full rounded-full">
                 <Link href="/how-it-works">How It Works</Link>
               </Button>
               <Button asChild variant="outline" className="w-full rounded-full">
                 <Link href="/catalog">Browse Catalogs</Link>
               </Button>
             </CardContent>
           </Card>
         </div>
       </div>
     </div>
   );
 }
