'use client';

import { useEffect, useState } from 'react';

interface StockData {
    symbol: string;
    ltp: number;
    change: number;
    changePercent: number;
}

interface NepseData {
    nepseIndex: {
        value: string;
        change: string;
        changePercent: string;
    };
    topGainers: StockData[];
    topLosers: StockData[];
    marketSummary: {
        totalTradedVolume: string;
        totalTradedValue: string;
        totalTransactions: string;
        companiesAdvanced: string;
        companiesDeclined: string;
        companiesUnchanged: string;
        totalListedCompanies: string;
    };
    lastUpdated: string;
    warning?: string;
}

export default function EODPage() {
    const [data, setData] = useState<NepseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/nepse');
                if (!res.ok) throw new Error('Failed to load NEPSE EOD data.');
                const json = await res.json();
                setData(json);
            } catch (err: any) {
                setError(err.message || 'Something went wrong.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">NEPSE EOD Dashboard</h1>

            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-xl font-semibold">NEPSE Index</h2>
                <p className="text-2xl font-bold">{data?.nepseIndex.value}</p>
                <p className="text-sm text-gray-500">
                    Change: {data?.nepseIndex.change} ({data?.nepseIndex.changePercent})
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-2 text-green-700">Top Gainers</h3>
                    <ul className="space-y-1">
                        {data?.topGainers.map((stock, i) => (
                            <li key={i} className="text-sm">
                                {stock.symbol} – LTP: Rs. {stock.ltp}, +{stock.change} ({stock.changePercent}%)
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-2 text-red-700">Top Losers</h3>
                    <ul className="space-y-1">
                        {data?.topLosers.map((stock, i) => (
                            <li key={i} className="text-sm">
                                {stock.symbol} – LTP: Rs. {stock.ltp}, {stock.change} ({stock.changePercent}%)
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
                <p>Last Updated: {new Date(data?.lastUpdated).toLocaleString()}</p>
                {data?.warning && <p className="text-yellow-600 mt-1">⚠️ {data.warning}</p>}
            </div>
        </div>
    );
}