export type BudgetItem = {
    id?: string;
    budget_id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    expand?: {
        product_id: {
            description: string;
        };
    };
}
