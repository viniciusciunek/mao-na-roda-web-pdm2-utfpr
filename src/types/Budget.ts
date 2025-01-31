export type Budget = {
    id?: string;
    number: number;
    customer_id: string;
    status: string;
    is_cancelled: boolean;
    is_paid: boolean;
    total: number;
    due_date: Date;
    obs: string;
    expand?: unknown;
}
