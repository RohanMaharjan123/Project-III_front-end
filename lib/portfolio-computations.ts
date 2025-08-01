import type { Holding, Transaction, Portfolio } from "@/types/portfolio.d.ts"

/**
 * Calculates the current value and unrealized gain/loss for a single holding.
 */
export function calculateHoldingMetrics(holding: Omit<Holding, 'current_value' | 'unrealized_gain_loss' | 'unrealized_gain_loss_percent'>): Holding {
    const current_value = holding.quantity * holding.stock.last_price;
    const unrealized_gain_loss = current_value - holding.total_cost;
    const unrealized_gain_loss_percent = (unrealized_gain_loss / holding.total_cost) * 100;

    return {
        ...holding,
        current_value,
        unrealized_gain_loss,
        unrealized_gain_loss_percent,
    };
}

/**
 * Processes a list of transactions to calculate current holdings.
 */
export function calculateHoldings(transactions: Transaction[]): Holding[] {
    const holdingsMap = new Map<number, Omit<Holding, 'current_value' | 'unrealized_gain_loss' | 'unrealized_gain_loss_percent'>>();

    transactions.forEach(tx => {
        let holding = holdingsMap.get(tx.stock.id);

        if (!holding) {
            holding = {
                id: tx.stock.id, // Assuming holding ID is the stock ID for simplicity
                stock: tx.stock,
                quantity: 0,
                average_buy_price: 0,
                total_cost: 0,
            };
        }

        if (tx.transaction_type === 'buy') {
            const newQuantity = holding.quantity + tx.quantity;
            const newTotalCost = holding.total_cost + (tx.quantity * tx.price);
            holding.quantity = newQuantity;
            holding.total_cost = newTotalCost;
            holding.average_buy_price = newTotalCost / newQuantity;
        } else { // sell
            // Note: This simple model doesn't track realized gains from sales.
            // That would require a more complex FIFO/LIFO or average cost basis calculation.
            holding.quantity -= tx.quantity;
            // The total cost is proportionally reduced based on the quantity sold.
            if (holding.quantity > 0) {
                holding.total_cost = holding.average_buy_price * holding.quantity;
            } else {
                holding.total_cost = 0; // Reset if all shares are sold
            }
        }

        holdingsMap.set(tx.stock.id, holding);
    });

    // Filter out holdings that have been completely sold and calculate final metrics
    return Array.from(holdingsMap.values())
        .filter(h => h.quantity > 0)
        .map(calculateHoldingMetrics);
}

/**
 * Calculates the total portfolio value and gain/loss metrics.
 */
export function calculatePortfolioTotals(portfolio: Omit<Portfolio, 'total_value' | 'total_investment' | 'total_unrealized_gain_loss' | 'total_unrealized_gain_loss_percent'>): Portfolio {
    const holdings = calculateHoldings(portfolio.transactions || []);

    const total_investment = holdings.reduce((acc, h) => acc + h.total_cost, 0);
    const total_value = holdings.reduce((acc, h) => acc + h.current_value, 0);
    const total_unrealized_gain_loss = total_value - total_investment;
    const total_unrealized_gain_loss_percent = total_investment > 0 ? (total_unrealized_gain_loss / total_investment) * 100 : 0;

    return {
        ...portfolio,
        holdings,
        total_investment,
        total_value,
        total_unrealized_gain_loss,
        total_unrealized_gain_loss_percent,
        // Realized gain/loss needs to be calculated separately based on sell transactions
        realized_gain_loss: portfolio.realized_gain_loss || 0,
    };
}

/**
 * Calculates realized gain/loss from a sell transaction.
 * This is a simplified version using average cost basis.
 */
export function calculateRealizedGainLoss(sellTransaction: Transaction, holdingsBeforeSell: Holding[]): number {
    const holding = holdingsBeforeSell.find(h => h.stock.id === sellTransaction.stock.id);
    if (!holding) {
        // This should not happen in a consistent dataset
        console.error("Attempted to sell a stock that was not held.");
        return 0;
    }

    const costOfSoldShares = holding.average_buy_price * sellTransaction.quantity;
    const proceedsFromSale = sellTransaction.price * sellTransaction.quantity;
    return proceedsFromSale - costOfSoldShares;
}
