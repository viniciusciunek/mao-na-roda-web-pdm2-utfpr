import { Budget } from "../types/Budget";

export interface IBudgetRepository {
    getAllBudgets(): Promise<Budget[]>;
    getBudgetById(id: string): Promise<Budget>;
    createBudget(budget: Budget): Promise<Budget>;
    updateBudget(id: string, budget: Budget): Promise<Budget>;
    deleteBudget(id: string): Promise<boolean>;
}
