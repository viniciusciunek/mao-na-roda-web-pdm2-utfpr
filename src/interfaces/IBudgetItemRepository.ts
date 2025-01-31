import { BudgetItem } from "../types/BudgetItem";

export interface IBudgetItemRepository {
    getAllBudgetItems(): Promise<BudgetItem[]>;
    getBudgetItemById(id: string): Promise<BudgetItem>;
    createBudgetItem(budgetItem: BudgetItem): Promise<BudgetItem>;
    updateBudgetItem(id: string, budgetItem: BudgetItem): Promise<BudgetItem>;
    deleteBudgetItem(id: string): Promise<boolean>;
}
