// import { Card, CardContent } from "@/components/ui/card"
// import { TrendingUp, TrendingDown } from "lucide-react"

// // const marketIndices = [
// //     { name: "NEPSE", value: "2,731.80", change: "+25.89", percent: "+0.95%", positive: true },
// //     { name: "SENSITIVE", value: "472.02", change: "+7.55", percent: "+1.62%", positive: true },
// //     // You can update the following once full values are available:
// //     { name: "FLOAT", value: "—", change: "—", percent: "—", positive: true },
// //     { name: "BANKING", value: "—", change: "≈+3.02%", percent: "≈+3.02%", positive: true },
// //     { name: "HYDROPOWER", value: "—", change: "≈−0.22%", percent: "≈−0.22%", positive: false },
// //     { name: "MANUFACTURING", value: "—", change: "—", percent: "—", positive: true },
// // ]

// export function MarketSummary() {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {marketIndices.map((index, i) => (
//                 <Card key={i} className="border-border bg-card hover:shadow-md transition-shadow">
//                     <CardContent className="p-6">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-sm font-medium text-muted-foreground">{index.name}</p>
//                                 <p className="text-2xl font-bold text-foreground">{index.value}</p>
//                                 <div
//                                     className={`flex items-center text-sm font-medium ${index.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
//                                         }`}
//                                 >
//                                     {index.positive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
//                                     <span>
//                                         {index.change} ({index.percent})
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             ))}
//         </div>
//     )
// }
