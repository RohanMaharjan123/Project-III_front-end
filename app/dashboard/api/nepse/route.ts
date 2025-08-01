// app/api/nepse/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [summaryRes, gainersRes, losersRes] = await Promise.all([
            fetch("https://nepseapi.surajrimal.dev/Summary"),
            fetch("https://nepseapi.surajrimal.dev/TopGainers"),
            fetch("https://nepseapi.surajrimal.dev/TopLosers"),
        ]);

        if (!summaryRes.ok || !gainersRes.ok || !losersRes.ok) {
            throw new Error("One or more external API calls failed");
        }

        const summary = await summaryRes.json();
        const gainers = await gainersRes.json();
        const losers = await losersRes.json();

        const nepseIndex = {
            value: summary?.CurrentIndex || "N/A",
            change: summary?.Change || "0",
            changePercent: summary?.PercChange || "0%",
        };

        const marketSummary = {
            totalTradedVolume: summary.TotalSharesTraded || "N/A",
            totalTradedValue: summary.TotalTurnover || "N/A",
            totalTransactions: summary.TotalTransactions || "N/A",
            companiesAdvanced: summary.Advance || "0",
            companiesDeclined: summary.Decline || "0",
            companiesUnchanged: summary.Uchanged || "0",
            totalListedCompanies: summary.TotalListedCompanies || "N/A",
        };

        const formatStock = (stock: any) => ({
            symbol: stock.Symbol,
            ltp: stock.LTP,
            change: stock.Change,
            changePercent: stock.PercentageChange,
        });

        return NextResponse.json({
            nepseIndex,
            marketSummary,
            topGainers: gainers.map(formatStock),
            topLosers: losers.map(formatStock),
            subindices: {}, // You can add another API call here if subindices are available elsewhere
            lastUpdated: new Date().toISOString(),
            warning: "Live data fetched from nepseapi.surajrimal.dev. Not official.",
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to fetch NEPSE data", details: error.message },
            { status: 500 }
        );
    }
}
