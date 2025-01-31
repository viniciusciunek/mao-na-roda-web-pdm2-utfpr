import { BudgetItem } from '../types/BudgetItem';
import { IBudgetItemRepository } from "../interfaces/IBudgetItemRepository";
import pb from '../services/pocketbase';

export default class BudgetItemRepository implements IBudgetItemRepository {
    async getAllBudgetItems(): Promise<BudgetItem[]> {
        return await pb.collection('budgets_items').getFullList();
    }

    async getAllBudgetItemsByBudgetId(budgetId: string): Promise<BudgetItem[]> {
        return await pb.collection('budgets_items').getFullList({
            filter: `budget_id = "${budgetId}"`,
            expand: 'product_id',
            $autoCancel: false
        });
    }

    async getBudgetItemById(id: string): Promise<BudgetItem> {
        return await pb.collection('budgets_items').getOne(id);
    }

    async createBudgetItem(budgetItem: BudgetItem): Promise<BudgetItem> {
        return await pb.collection('budgets_items').create(budgetItem);
    }

    async updateBudgetItem(id: string, budgetItem: BudgetItem): Promise<BudgetItem> {
        return await pb.collection('budgets_items').update(id, budgetItem);
    }

    async deleteBudgetItem(id: string): Promise<boolean> {
        return await pb.collection('budgets_items').delete(id);
    }
}
