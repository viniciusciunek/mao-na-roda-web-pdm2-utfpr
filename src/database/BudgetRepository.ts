import { Budget } from "../types/Budget";
import { IBudgetRepository } from './../interfaces/IBudgetRepository';
import pb from "../services/pocketbase";

export default class BudgetRepository implements IBudgetRepository {
    async getAllBudgets(): Promise<Budget[]> {
        return await pb.collection('budgets').getFullList({
            expand: 'customer_id'
        });
    }

    async getBudgetById(id: string): Promise<Budget> {
        return await pb.collection('budgets').getOne(id, {
            $autoCancel: false,
        });
    }

    async createBudget(budget: Budget): Promise<Budget> {
        return await pb.collection('budgets').create(budget);
    }

    async updateBudget(id: string, budget: Budget): Promise<Budget> {
        return await pb.collection('budgets').update(id, budget);
    }

    async deleteBudget(id: string): Promise<boolean> {
        return await pb.collection('budgets').delete(id);
    }

    async getCountByStatus(status: string): Promise<number> {
        try {
            const response = await pb.collection('budgets').getList(1, 1, {
                filter: `status='${status}'`,
                skipTotal: false,
                $autoCancel: false,
            });
            return response.totalItems;
        } catch (error) {
            console.error(error);

            return 0;
        }
    }
}
